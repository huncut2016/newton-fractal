#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    shader.load("shader"); 
}

//--------------------------------------------------------------
void ofApp::update(){

}

//--------------------------------------------------------------
void ofApp::draw(){
    shader.begin(); //call the shaders
        shader.setUniform2f("WindowSize", ofGetWidth(), ofGetHeight());
        shader.setUniform1f("zoom", zoom);
        shader.setUniform2f("Positions", xx, yy);
        shader.setUniform1i("max_iterations", max_iter);

        ofDrawRectangle(0, 0, ofGetWidth(), ofGetHeight());
    shader.end();
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){
    switch (key)
    {
    case '+':
        max_iter += 10;
        break;
    case '-':
        max_iter -= 10;
        break;
    default:
        break;
    }
}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){
    xx -= (x-prevX) / 2*zoom;
    yy += (y-prevY) / 2*zoom;

    prevX = x;
    prevY = y; 
}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){
    prevX = x;
    prevY = y;
}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}

void ofApp::mouseScrolled(int xx, int yy, float scrollX, float scrollY) {
     if (scrollY == -1) {
        zoom *= 1.07;
    } else {
        zoom /= 1.07;
    }
}