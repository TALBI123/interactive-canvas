#include <iostream>
using namespace std;
class point
{
public:
    int x, y;
    point(int a, int b) : x(a), y(b) {}
    point &operator+(const point &p)
    {
        
    }
};
int main()
{
    point p1(1, 2), p2(3, 5), p3(4, 5);
    p3 = p1 + p2;
}