import os
import shutil
import cv2
from keras.models import load_model, model_from_json
import numpy as np
from mtcnn.mtcnn import MTCNN
detector = MTCNN()

age_ranges = {
    0: '1-2',
    1: '3-9',
    2: '10-20',
    3: '21-27',
    4: '28-45',
    5: '46-65',
    6: '66-116',
}

# model = load_model('final_cnn_model_checkpoint.h5')
BASE_PATH = './api/machine_learning'

class Detection:

    def __init__(self, filename, img_path, save_path, detected_path='detected_images', show_image=False, detect_eyes=False):
        self.filename = filename
        self.img_path = img_path
        self.image = cv2.imread(img_path)
        self.frame = cv2.imread(img_path)
        self.faces = detector.detect_faces(self.frame)
        self.detected_path = detected_path
        self.show_image = show_image
        self.save_path = save_path
        self.detect_eyes = detect_eyes
        self.offset = 50

    def detect_faces(self):
        
        self._add_bounding_boxes()
        
        if self.show_image:
            self._display()
    
    def detect_eyes(self):
        for face in self.faces:
            print(face['keypoints'])
        
    def _display(self):
        cv2.imshow("Face Detection - to quit press ESC", self.frame)
        key = cv2.waitKey(0)
        cv2.destroyAllWindows()
    
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
    
    def crop_faces(self):
        index = 0
        folder = f'cropped_{self.img_path}'[:-4]
        
        if folder in os.listdir('./'):
            shutil.rmtree(folder)
        os.mkdir(folder)
        offset = self.offset
        offset = 0

        for face in self.faces:
            index += 1
            x, y, w, h = face['box']
            cropped_face = self.frame[y - offset : y + h + offset, x - offset : x + w + offset]
            cv2.imwrite(f'{folder}/cropped_{index}.jpg', cropped_face)
    
    def predict_age(self):
        folder = f'cropped_{self.img_path}'[:-4]

        cv2_image = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)
        cv2_image = cv2.resize(cv2_image, (200, 200), interpolation = cv2.INTER_AREA)


        data = np.array([cv2_image]).reshape(-1, 200,200, 1)

        predicted = model.predict(data)
        index = np.argmax(predicted)

        return age_ranges[index]

    def predict_emotion(self):
        emotion_dict = {
            0: "Angry",
            1: "Disgusted", 
            2: "Fearful",
            3: "Happy",
            4: "Neutral",
            5: "Sad",
            6: "Surprised"
        }

        files = f'cropped_{self.img_path[:-4]}'
        json_file = open('emotion_model.json', 'r')
        loaded_model_json = json_file.read()
        emotion_model = model_from_json(loaded_model_json)

        emotion_model.load_weights("emotion_model.h5")
        
        for file in os.listdir(f'./{files}'):
            cropped_img = cv2.imread(f'./{files}/{file}')
            cropped_img = cv2.cvtColor(cropped_img, cv2.COLOR_BGR2GRAY)
            cropped_img = cv2.resize(cropped_img, (48, 48))

            cropped_img = np.expand_dims(cropped_img, axis=0)
            predicted = emotion_model.predict(cropped_img)
            
            maxindex = int(np.argmax(predicted))
            print(emotion_dict[maxindex])
        shutil.rmtree(files)

    def get_processed_image(self):
        return self.frame

    def save(self):
        cv2.imwrite(self.save_path, self.frame)