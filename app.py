from flask import Flask,render_template,request,redirect,url_for,jsonify,flash
from tensorflow import keras
from keras.models import load_model
import os
import numpy as np

app=Flask(__name__)

app.config['SECRET_KEY'] = 'AAAAAAAAAA'   
categories={0:"It's cat",1:" It's dog"}

model=keras.models.load_model('Model')

size=130
def predict_image(img_path):
    im=keras.preprocessing.image.load_img(img_path,target_size=(size,size))
    im=keras.preprocessing.image.img_to_array(im)
    im=np.array(im).reshape(-1,size,size,3)
    p=model.predict(im)
    print(p)
    return p

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/image',methods=['GET','POST'])
def image():
    if request.method=='POST':
        fakepath=request.form.get("todo")
        print(fakepath)
        img_path='/static/images/predict_images/'+fakepath.split("\\")[-1]
        im_path='C:/Users/Lenovo/Desktop/WebApplication'+img_path
        predict=jsonify({'categories':categories[np.argmax(predict_image(im_path))],
                        'img':"<img class='pred_img' src="+img_path+" alt="">",
                        'cat':str(predict_image(im_path)[0][0]),
                        'dog':str(predict_image(im_path)[0][1])})
        return predict
        
if __name__=='__main__':
    app.run(debug=True)