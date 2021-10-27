#version 130
out vec4 outputColor;
uniform vec2 WindowSize;
uniform float zoom;
uniform vec2 Positions;
uniform int max_iterations;


int WIDTH = 0;
int HEIGHT = 1;
precision highp float;

float map (float n, float start1,float  stop1, float start2,float  stop2) {
    return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
} // map n [start1 , start2] interval to [stop1, stop2] interval

vec2 ComplexProduct(vec2 a, vec2 b){
    return vec2(a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x);
}

vec2 ComplexDivide(vec2 a, vec2 b) {
    return vec2(((a.x*b.x+a.y*b.y)/(b.x*b.x+b.y*b.y)),((a.y*b.x-a.x*b.y)/(b.x*b.x+b.y*b.y)));
} 

vec2 f (vec2 x) { // f(x) where x is a complex number
    vec2 sq = ComplexProduct(x,x); // x^2
    vec2 tri = ComplexProduct(x, sq); // x^3
    vec2 qu = ComplexProduct(sq,sq); // x^4
    vec2 oc = ComplexProduct(qu,qu); // x^8

    return ComplexProduct(oc, sq) - vec2(1,0); // 1.] x^10 - 1
    return ComplexProduct(oc) - vec2(1,0); // 2.] x^8 - 1
    return ComplexProduct(qu) - vec2(1,0); // 3.] x^4 - 1
}   

vec2 df (vec2 x) { //f'(x) where x is a complex number
    vec2 sq = ComplexProduct(x,x); // x^2
    vec2 tri = ComplexProduct(x, sq); // x^3
    vec2 qu = ComplexProduct(sq,sq); // x^4
    vec2 oc = ComplexProduct(qu,qu); // x^8

    return ComplexProduct(vec2(10,0), ComplexProduct(oc, x)); // derivative of 1.]
    return ComplexProduct(vec2(8,0), ComplexProduct(qu, tri)); // derivative of 2.]
    return ComplexProduct(vec2(4,0), tri); // derivative of 3.]
}

vec2 newton (float x, float y) { //newton method (https://en.wikipedia.org/wiki/Newton%27s_method)
    vec2 x0 = vec2(x,y); //x_0

    for (int i = 0; i < max_iterations; i++) {
        x0 = x0 - ComplexDivide(f(x0), df(x0)); //x_{n+1} = x_n - f(x) / f'(x)
    }

    return x0;
}

vec3 hsv2rgb(vec3 c);

void main(){

    float h = WindowSize[HEIGHT];
    float w = WindowSize[WIDTH];

    float y = map(gl_FragCoord.y, 0.0, h, -h/2 * zoom + Positions.y, h/2 * zoom + Positions.y);
    float x = map(gl_FragCoord.x , 0.0, w, -w/2  * zoom + Positions.x, w/2 * zoom + Positions.x);

    vec2 root = newton(x,y);

    float theta = atan(root.y, root.x); 
    
    float theta2color = map(theta , 0.0, 6.2832, 0.0, 1.0);
  
    /*float mappedR = map(x*x + y*y, 0, h*h + w*w, 0.0, 1.0);

    float RPlusTheta = (theta2color + mappedR) / 2;*/
    

    vec3 color =  vec3(theta2color, 1.0, 1.0);
    outputColor = vec4(hsv2rgb(color), 1.0);
}

vec3 hsv2rgb(vec3 c) { // https://stackoverflow.com/a/17897228/13198008
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}