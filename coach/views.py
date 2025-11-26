from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

# Create your views here.
def home(request):
    return render(request, 'coach/index.html')

@require_http_methods(["POST"])
def submit_contact_form(request):
    try:
        data = json.loads(request.body)
        name = data.get('name', '')
        email = data.get('email', '')
        message = data.get('message', '')
        
        # Log to console output
        print("\n" + "="*50)
        print("НОВОЕ СООБЩЕНИЕ ИЗ ФОРМЫ КОНТАКТА")
        print("="*50)
        print(f"Имя: {name}")
        print(f"Email: {email}")
        print(f"Сообщение: {message}")
        print("="*50 + "\n")
        
        return JsonResponse({
            'success': True,
            'message': 'Сообщение получено!'
        })
    except Exception as e:
        print(f"Ошибка при обработке формы: {str(e)}")
        return JsonResponse({
            'success': False,
            'message': 'Ошибка при обработке формы'
        }, status=400)
