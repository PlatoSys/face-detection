import os
import cv2
from mtcnn.mtcnn import MTCNN
detector = MTCNN()

class Face:

    def __init__(self, img_path, detected_path='downloads', show_image=False, detect_eyes=False):
        self.img_path = img_path
        self.image = cv2.imread(img_path)
        self.frame = cv2.imread(img_path)
        self.faces = detector.detect_faces(self.frame)
        self.detected_path = detected_path
        self.show_image = show_image
        self.detect_eyes = detect_eyes

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
    
    def save(self):
        if not self.detected_path in os.listdir():
            os.mkdir(self.detected_path)
        cv2.imwrite(f'./{self.detected_path}/{self.img_path}', self.frame)

# face = Face('3face.jpg')
# face.detect_faces()
# face.save()