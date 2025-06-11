from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from sympy import sympify, Symbol, lambdify
import numpy as np

class IntegralTrapesiumView(APIView):
    def post(self, request):
        data = request.data
        func_str = data.get('function')
        a = data.get('a')
        b = data.get('b')
        h = data.get('h')

        # Validasi input
        if func_str is None or a is None or b is None or h is None:
            return Response({"error": "function, a, b, dan h harus diisi"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            a = float(a)
            b = float(b)
            h = float(h)
        except ValueError:
            return Response({"error": "a, b, dan h harus angka valid"}, status=status.HTTP_400_BAD_REQUEST)
        if a >= b:
            return Response({"error": "b harus lebih besar dari a"}, status=status.HTTP_400_BAD_REQUEST)
        if h <= 0:
            return Response({"error": "h harus positif"}, status=status.HTTP_400_BAD_REQUEST)

        x = Symbol('x')
        try:
            expr = sympify(func_str)
            f = lambdify(x, expr, "numpy")
        except Exception:
            return Response({"error": "Fungsi matematika tidak valid."}, status=status.HTTP_400_BAD_REQUEST)

        n_float = (b - a) / h
        if abs(round(n_float) - n_float) > 1e-10:
            return Response({"error": "h harus membagi interval [a,b] secara tepat"}, status=status.HTTP_400_BAD_REQUEST)
        n = int(round(n_float))

        xs = np.linspace(a, b, n + 1)
        try:
            ys = f(xs)
            integral = (h / 2) * np.sum(ys[:-1] + ys[1:])
        except Exception as e:
            return Response({"error": f"Error saat evaluasi fungsi: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

        data_points = [{"x": float(xi), "y": float(yi)} for xi, yi in zip(xs, ys)]
        print({
            "integral": integral,
            "data_points": data_points,
            "n": n,
            "h": h,
            "interval": [a, b],
            "function": func_str,
            "method": "Trapesium"
        })
        return Response({
            "integral": integral,
            "data_points": data_points,
            "n": n,
            "h": h,
            "interval": [a, b],
            "function": func_str,
            "method": "Trapesium"
        })

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from sympy import sympify, Symbol, lambdify
import numpy as np

class IntegralTrapesiumView(APIView):
    def post(self, request):
        data = request.data
        func_str = data.get('function')
        a = data.get('a')
        b = data.get('b')
        h = data.get('h')

        # Validasi input
        if func_str is None or a is None or b is None or h is None:
            return Response({"error": "function, a, b, dan h harus diisi"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            a = float(a)
            b = float(b)
            h = float(h)
        except ValueError:
            return Response({"error": "a, b, dan h harus angka valid"}, status=status.HTTP_400_BAD_REQUEST)
        if a >= b:
            return Response({"error": "b harus lebih besar dari a"}, status=status.HTTP_400_BAD_REQUEST)
        if h <= 0:
            return Response({"error": "h harus positif"}, status=status.HTTP_400_BAD_REQUEST)

        x = Symbol('x')
        try:
            expr = sympify(func_str)
            f = lambdify(x, expr, "numpy")
        except Exception:
            return Response({"error": "Fungsi matematika tidak valid."}, status=status.HTTP_400_BAD_REQUEST)

        n_float = (b - a) / h
        if abs(round(n_float) - n_float) > 1e-10:
            return Response({"error": "h harus membagi interval [a,b] secara tepat"}, status=status.HTTP_400_BAD_REQUEST)
        n = int(round(n_float))

        xs = np.linspace(a, b, n + 1)
        try:
            ys = f(xs)
        except Exception as e:
            return Response({"error": f"Error saat evaluasi fungsi: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

        # Perhitungan integral dan tabel rinci
        detailed_table = []
        total_area = 0
        
        for i in range(n):
            x_left = xs[i]
            x_right = xs[i + 1]
            y_left = ys[i]
            y_right = ys[i + 1]
            
            # Luas trapesium untuk interval ini
            trapezoid_area = (h / 2) * (y_left + y_right)
            total_area += trapezoid_area
            
            # Data untuk tabel
            row_data = {
                "interval_no": i + 1,
                "x_left": round(float(x_left), 6),
                "x_right": round(float(x_right), 6),
                "y_left": round(float(y_left), 6),
                "y_right": round(float(y_right), 6),
                "average_height": round(float((y_left + y_right) / 2), 6),
                "width": round(float(h), 6),
                "trapezoid_area": round(float(trapezoid_area), 6),
                "cumulative_area": round(float(total_area), 6),
                "formula": f"({h}/2) × ({y_left:.6f} + {y_right:.6f})"
            }
            detailed_table.append(row_data)

        # Data points untuk grafik
        data_points = [{"x": float(xi), "y": float(yi)} for xi, yi in zip(xs, ys)]
        
        # Summary statistik
        summary_stats = {
            "total_intervals": n,
            "interval_width": h,
            "min_y_value": round(float(np.min(ys)), 6),
            "max_y_value": round(float(np.max(ys)), 6),
            "average_y_value": round(float(np.mean(ys)), 6),
            "total_area_calculated": round(float(total_area), 6)
        }

        return Response({
            "integral": round(float(total_area), 6),
            "data_points": data_points,
            "detailed_table": detailed_table,
            "summary_stats": summary_stats,
            "calculation_info": {
                "n": n,
                "h": h,
                "interval": [a, b],
                "function": func_str,
                "method": "Trapesium",
                "formula_used": "∫f(x)dx ≈ (h/2) × Σ[f(xi) + f(xi+1)]"
            }
        })
    
