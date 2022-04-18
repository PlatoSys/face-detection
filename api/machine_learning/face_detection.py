import cv2
from skimage import io
from keras.models import load_model
# from keras.models import model_from_json
from mtcnn_cv2 import MTCNN
detector = MTCNN()


model = load_model('./api/machine_learning/final_cnn_model_checkpoint.h5')


class Detection:
    """Detection Class"""
    def __init__(self, filename, img_path, save_path, detect_eyes=False):
        img = io.imread(img_path)
        self.filename = filename
        self.img_path = img_path
        self.image = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
        self.frame = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
        self.faces = detector.detect_faces(self.frame)
        self.save_path = save_path
        self.detect_eyes = detect_eyes

    def detect_faces(self):
        self._add_bounding_boxes()
        self.predict_age()

    def _add_bounding_boxes(self):
        for result in self.faces:
            x, y, w, h = result['box']
            x1, y1 = x + w, y + h
            cv2.rectangle(self.frame, (x, y), (x1, y1), (0, 0, 255), 2)
            if self.detect_eyes:
                self._add_bounding_circles(result['keypoints'])

    def _add_bounding_circles(self, keypoints):
        cv2.circle(self.frame, (keypoints['left_eye']), 2, (0, 155, 255), 2)
        cv2.circle(self.frame, (keypoints['right_eye']), 2, (0, 155, 255), 2)
        cv2.circle(self.frame, (keypoints['nose']), 2, (0, 155, 255), 2)
        cv2.circle(self.frame, (keypoints['mouth_left']), 2, (0, 155, 255), 2)
        cv2.circle(self.frame, (keypoints['mouth_right']), 2, (0, 155, 255), 2)

    def _put_text(self, text, x, y, scale=0.5):
        font = cv2.FONT_HERSHEY_SIMPLEX

        cv2.putText(self.frame, text, (x, y - 10),
                    font, scale, (0, 0, 255), 1, 2)

    def predict_age(self):
        MODEL_MEAN_VALUES = (78.4263377603, 87.7689143744, 114.895847746)
        GENDER_MODEL = './api/machine_learning/weights/deploy_gender.prototxt'
        GENDER_PROTO = './api/machine_learning/weights/gender_net.caffemodel'
        MODEL_MEAN_VALUES = (78.4263377603, 87.7689143744, 114.895847746)
        GENDER_LIST = ['Male', 'Female']

        gender_net = cv2.dnn.readNetFromCaffe(GENDER_MODEL, GENDER_PROTO)

        for face in self.faces:
            x, y, w, h = face['box']
            x_offset = int(w * 0.5)
            y_offset = int(h * 0.5)

            x0 = 0 if x - x_offset <= 0 else x - x_offset
            y0 = 0 if y - y_offset <= 0 else y - y_offset

            cropped_face = self.frame[y0: y + h + y_offset,
                                      x0: x + w + x_offset]
            image = cropped_face.copy()

            # Debuging
            # cv2.imwrite(f'./test_{x_offset}_{y_offset}.jpg', image)

            blob = cv2.dnn.blobFromImage(image=image, scalefactor=1.0, size=(
                227, 227), mean=MODEL_MEAN_VALUES, swapRB=False, crop=False)

            gender_net.setInput(blob)
            gender_preds = gender_net.forward()
            index = gender_preds[0].argmax()
            gender = GENDER_LIST[index]
            confidence_score = gender_preds[0][index]

            self._put_text(f'{gender}-{round(confidence_score*100, 1)}%',
                           x=x, y=y, scale=1)

    def predict_emotion(self):
        pass
    #     emotion_dict = {
    #         0: "Angry",
    #         1: "Disgusted",
    #         2: "Fearful",
    #         3: "Happy",
    #         4: "Neutral",
    #         5: "Sad",
    #         6: "Surprised"
    #     }

    #     files = f'cropped_{self.img_path[:-4]}'
    #     json_file = open('emotion_model.json', 'r')
    #     loaded_model_json = json_file.read()
    #     emotion_model = model_from_json(loaded_model_json)

    #     emotion_model.load_weights("emotion_model.h5")

    #     for file in os.listdir(f'./{files}'):
    #         cropped_img = cv2.imread(f'./{files}/{file}')
    #         cropped_img = cv2.cvtColor(cropped_img, cv2.COLOR_BGR2GRAY)
    #         cropped_img = cv2.resize(cropped_img, (48, 48))

    #         cropped_img = np.expand_dims(cropped_img, axis=0)
    #         predicted = emotion_model.predict(cropped_img)

    #         maxindex = int(np.argmax(predicted))
    #         print(emotion_dict[maxindex])
    #     shutil.rmtree(files)

    def save(self):
        cv2.imwrite(self.save_path, self.frame)
