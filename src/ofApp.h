#pragma once

#include "ofMain.h"

class ofApp : public ofBaseApp{

	public:
		void setup();
		void update();
		void draw();

		void keyPressed(int key);
		void keyReleased(int key);
		void mouseMoved(int x, int y );
		void mouseDragged(int x, int y, int button);
		void mousePressed(int x, int y, int button);
		void mouseReleased(int x, int y, int button);
		void mouseEntered(int x, int y);
		void mouseExited(int x, int y);
		void windowResized(int w, int h);
		void dragEvent(ofDragInfo dragInfo);
		void gotMessage(ofMessage msg);
		void mouseScrolled(int xx, int yy, float scrollX, float scrollY);
		
		ofShader shader; // newton fractal shaders
		float zoom = 1; // zoom of the fractal

		float xx = 0, // x pos of the camera
		yy = 0, // x pos of the camera 
		prevX, // previous x position
		prevY; // previous x position
		int max_iter = 400; // max iterations in newton method
};
