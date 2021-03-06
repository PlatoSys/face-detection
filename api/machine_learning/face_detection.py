"""Face Detection Module"""
from enum import Enum
import cv2
from skimage import io
from keras.models import model_from_json
from mtcnn_cv2 import MTCNN
import numpy as np

json_file = open('./api/machine_learning/weights/emotion_model.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
emotion_model = model_from_json(loaded_model_json)
emotion_model.load_weights("./api/machine_learning/weights/emotion_model.h5")


class Detection:
    """Detection Class"""

    detector = MTCNN()

    def __init__(self, filename, img_path, save_path, detect_eyes=False):
        """Init"""
        img = io.imread(img_path)
        self.filename = filename
        self.img_path = img_path
        self.image = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
        self.frame = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
        self.faces = self.detector.detect_faces(self.frame)
        self.save_path = save_path
        self.detect_eyes = detect_eyes
        self.rectangle_colors = {}

    def detect_faces(self):
        """Detect All Faces"""
        self.faces = [face for face in self.faces if face['confidence'] > 0.85]
        self.predict_emotion()
        self.predict_age()
        self.predict_gender()
        self._add_bounding_boxes()

    def _add_bounding_boxes(self):
        """Add Bounding Boxes to Faces"""
        for result in self.faces:
            x, y, w, h = result['box']
            x1, y1 = x + w, y + h
            color = self.rectangle_colors[f'{x}_{y}_{w}_{h}'].value
            cv2.rectangle(self.frame, (x, y), (x1, y1), color, 2)
            if self.detect_eyes:
                self._add_bounding_circles(result['keypoints'])

    def _add_bounding_circles(self, keypoints):
        """Add Bounding Circles to face"""
        cv2.circle(self.frame, (keypoints['left_eye']), 2, (0, 155, 255), 2)
        cv2.circle(self.frame, (keypoints['right_eye']), 2, (0, 155, 255), 2)
        cv2.circle(self.frame, (keypoints['nose']), 2, (0, 155, 255), 2)
        cv2.circle(self.frame, (keypoints['mouth_left']), 2, (0, 155, 255), 2)
        cv2.circle(self.frame, (keypoints['mouth_right']), 2, (0, 155, 255), 2)

    def _put_text(self, text, x, y, scale, color):
        """Put Text"""
        font = cv2.FONT_HERSHEY_SIMPLEX

        cv2.putText(self.frame, text, (x, y - 10),
                    font, scale, color.value, 2, 2)

    def predict_emotion(self):
        """Predict Emotion"""
        EMOTION_LIST = {
            0: "Angry",
            1: "Disgusted",
            2: "Fearful",
            3: "Happy",
            4: "Neutral",
            5: "Sad",
            6: "Surprised"
        }

        for face in self.faces:
            x, y, w, h = face['box']
            x_offset = 0
            y_offset = 0
            x0 = 0 if x - x_offset <= 0 else x - x_offset
            y0 = 0 if y - y_offset <= 0 else y - y_offset

            cropped_face = self.frame[y0: y + h + y_offset,
                                      x0: x + w + x_offset]
            image = cropped_face.copy()

            image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            image = np.expand_dims(
                np.expand_dims(cv2.resize(image, (48, 48)), -1), 0)
            prediction = emotion_model.predict(image)

            index = int(np.argmax(prediction))
            emotion = EMOTION_LIST[index]

            face['emotion'] = {
                "identity": emotion,
                "confidence": 92.5
            }

    def predict_age(self):
        """Predict Age"""
        MODEL_MEAN_VALUES = (78.4263377603, 87.7689143744, 114.895847746)
        AGE_MODEL = './api/machine_learning/weights/age_deploy.prototxt'
        AGE_PROTO = './api/machine_learning/weights/age_net.caffemodel'
        AGE_LIST = ['(0 - 2)', '(4 - 6)', '(8 - 12)', '(15 - 20)', '(25 - 32)',
                    '(38 - 43)', '(48 - 53)', '(60 - 100)']

        age_net = cv2.dnn.readNet(AGE_MODEL, AGE_PROTO)

        for face in self.faces:
            x, y, w, h = face['box']
            x_offset = int(w * 0.5)
            y_offset = int(h * 0.5)

            x0 = 0 if x - x_offset <= 0 else x - x_offset
            y0 = 0 if y - y_offset <= 0 else y - y_offset

            cropped_face = self.frame[y0: y + h + y_offset,
                                      x0: x + w + x_offset]
            image = cropped_face.copy()

            blob = cv2.dnn.blobFromImage(image=image, scalefactor=1.0, size=(
                227, 227), mean=MODEL_MEAN_VALUES, swapRB=False, crop=False)

            age_net.setInput(blob)
            age_preds = age_net.forward()
            index = age_preds[0].argmax()
            age = AGE_LIST[index]
            confidence_score = age_preds[0][index]

            face['age'] = {
                "identity": age,
                "confidence": confidence_score * 100
            }

    def predict_gender(self):
        """Predict Gender"""
        MODEL_MEAN_VALUES = (78.4263377603, 87.7689143744, 114.895847746)
        GENDER_MODEL = './api/machine_learning/weights/deploy_gender.prototxt'
        GENDER_PROTO = './api/machine_learning/weights/gender_net.caffemodel'
        GENDER_LIST = ['Male', 'Female']

        gender_net = cv2.dnn.readNetFromCaffe(GENDER_MODEL, GENDER_PROTO)

        for face in self.faces:
            x, y, w, h = face['box']
            x_offset = int(w * 0.8)
            y_offset = int(h * 0.8)

            x0 = 0 if x - x_offset <= 0 else x - x_offset
            y0 = 0 if y - y_offset <= 0 else y - y_offset

            cropped_face = self.frame[y0: y + h + y_offset,
                                      x0: x + w + x_offset]
            image = cropped_face.copy()

            blob = cv2.dnn.blobFromImage(image=image, scalefactor=1.0, size=(
                227, 227), mean=MODEL_MEAN_VALUES, swapRB=False, crop=False)

            gender_net.setInput(blob)
            gender_preds = gender_net.forward()
            index = gender_preds[0].argmax()
            gender = GENDER_LIST[index]
            confidence_score = gender_preds[0][index]

            color = Color.BLUE if gender == 'Male' else Color.RED
            color = color if confidence_score > 0.8 else Color.GREEN
            self.rectangle_colors[f'{x}_{y}_{w}_{h}'] = color

            face['gender'] = {
                "identity": gender,
                "confidence": confidence_score * 100
            }

    @property
    def width(self):
        return self.image.shape[1]

    @property
    def height(self):
        return self.image.shape[0]

    @property
    def landmarks(self):
        return [
            self.to_json(index, face) for index, face in enumerate(self.faces)]

    @staticmethod
    def to_json(index, face):
        return {
                'face_id': index,
                'box': {
                    'x': face['box'][0],
                    'y': face['box'][1],
                    'width': face['box'][2],
                    'height': face['box'][3]
                },
                'landmarks': {
                    'left_eye': {
                        'x': face['keypoints']['left_eye'][0],
                        'y': face['keypoints']['left_eye'][1]
                    },
                    'right_eye': {
                        'x': face['keypoints']['right_eye'][0],
                        'y': face['keypoints']['right_eye'][1]
                    },
                    'mouth_left': {
                        'x': face['keypoints']['mouth_left'][0],
                        'y': face['keypoints']['mouth_left'][1]
                    },
                    'mouth_right': {
                        'x': face['keypoints']['mouth_right'][0],
                        'y': face['keypoints']['mouth_right'][1]
                    },
                    'nose': {
                        'x': face['keypoints']['nose'][0],
                        'y': face['keypoints']['nose'][1]
                    },
                },
                'gender': face['gender'],
                'age': face['age'],
                'emotion': face['emotion'],
            }

    def save(self):
        """Save the image"""
        cv2.imwrite(self.save_path, self.frame)


class Color(Enum):
    """Color Enum"""

    RED = (51, 56, 219)
    GREEN = (182, 219, 145)
    BLUE = (244, 149, 50)
