#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Расширенный скрипт для создания корпоративной презентации
Требует: python-pptx, pillow, matplotlib для графиков
"""

import os
import json
from datetime import datetime

# Конфигурация презентации
CONFIG = {
    "company_name": "Название компании",
    "template_file": "template.pptx",
    "output_file": "company_presentation_final.pptx",
    "color_scheme": {
        "primary": "#2E86AB",
        "secondary": "#A23B72",
        "accent": "#F18F01",
        "text": "#2D3047",
        "background": "#FFFFFF"
    },
    "fonts": {
        "title": "Arial Black",
        "body": "Arial",
        "accent": "Calibri"
    },
    "effects": {
        "shadow": True,
        "3d_rotation": False,
        "reflection": True,
        "glow": False
    }
}

# Примерная структура презентации
PRESENTATION_STRUCTURE = [
    {
        "slide_number": 1,
        "title": "Титульный слайд",
        "layout": "title",
        "content": {
            "main_title": "Название компании",
            "subtitle": "Слоган или описание",
            "date": datetime.now().strftime("%Y"),
            "logo_position": "center"
        }
    },
    {
        "slide_number": 2,
        "title": "О компании",
        "layout": "content_with_image",
        "content": {
            "title": "О нас",
            "text": "Краткое описание компании, история, миссия",
            "image": "about_us.jpg",
            "bullet_points": [
                "Основана в XXXX году",
                "Лидер в своей отрасли",
                "Инновационный подход"
            ]
        }
    },
    {
        "slide_number": 3,
        "title": "Наши услуги",
        "layout": "two_column",
        "content": {
            "title": "Что мы предлагаем",
            "left_column": [
                "Услуга 1",
                "Услуга 2",
                "Услуга 3"
            ],
            "right_column": [
                "Услуга 4",
                "Услуга 5",
                "Услуга 6"
            ],
            "icons": True
        }
    },
    {
        "slide_number": 4,
        "title": "Достижения",
        "layout": "chart",
        "content": {
            "title": "Наш рост",
            "chart_type": "line",
            "data": {
                "years": [2020, 2021, 2022, 2023, 2024],
                "values": [100, 150, 225, 320, 450]
            },
            "description": "Рост показателей за последние 5 лет"
        }
    },
    {
        "slide_number": 5,
        "title": "Команда",
        "layout": "team_grid",
        "content": {
            "title": "Наша команда",
            "team_members": [
                {"name": "Имя 1", "position": "Должность", "photo": "team1.jpg"},
                {"name": "Имя 2", "position": "Должность", "photo": "team2.jpg"},
                {"name": "Имя 3", "position": "Должность", "photo": "team3.jpg"},
                {"name": "Имя 4", "position": "Должность", "photo": "team4.jpg"}
            ]
        }
    },
    {
        "slide_number": 6,
        "title": "Клиенты и партнеры",
        "layout": "logos_grid",
        "content": {
            "title": "Нам доверяют",
            "logos": ["client1.png", "client2.png", "client3.png", "client4.png"],
            "testimonial": "Отзыв от ключевого клиента"
        }
    },
    {
        "slide_number": 7,
        "title": "Контакты",
        "layout": "contact",
        "content": {
            "title": "Свяжитесь с нами",
            "address": "Адрес офиса",
            "phone": "+7 (XXX) XXX-XX-XX",
            "email": "info@company.com",
            "website": "www.company.com",
            "social_media": {
                "instagram": "@company",
                "telegram": "@company_channel"
            }
        }
    }
]

# Эффекты для изображений
IMAGE_EFFECTS = {
    "shadow": {
        "enabled": True,
        "distance": 4,
        "direction": 45,
        "blur": 6,
        "transparency": 0.3
    },
    "border": {
        "enabled": True,
        "width": 2,
        "color": "#E0E0E0",
        "style": "solid"
    },
    "corner_radius": {
        "enabled": True,
        "radius": 10
    },
    "3d_effect": {
        "enabled": False,
        "depth": 20,
        "angle": 15
    }
}

# Настройки для музыки
AUDIO_SETTINGS = {
    "background_music": {
        "file": "background_music.mp3",
        "duration": 120,  # 2 минуты
        "volume": 0.3,
        "fade_in": 2,
        "fade_out": 3,
        "loop": False
    }
}

# Анимации и переходы
ANIMATIONS = {
    "slide_transitions": {
        "type": "fade",
        "duration": 1.5,
        "direction": "left"
    },
    "text_animations": {
        "entrance": "fade_in",
        "emphasis": "pulse",
        "exit": "fade_out",
        "delay": 0.5
    },
    "image_animations": {
        "entrance": "zoom_in",
        "emphasis": "float",
        "exit": "zoom_out",
        "delay": 1.0
    }
}

def create_presentation_config():
    """Создает JSON файл с конфигурацией презентации"""
    config_data = {
        "config": CONFIG,
        "structure": PRESENTATION_STRUCTURE,
        "effects": IMAGE_EFFECTS,
        "audio": AUDIO_SETTINGS,
        "animations": ANIMATIONS
    }

    with open("presentation_config.json", "w", encoding="utf-8") as f:
        json.dump(config_data, f, ensure_ascii=False, indent=2)

    print("Конфигурация презентации создана: presentation_config.json")
    print("Отредактируйте этот файл с вашими данными перед созданием презентации")

if __name__ == "__main__":
    create_presentation_config()
    print("\n=== Инструкция по созданию презентации ===")
    print("1. Установите необходимые библиотеки:")
    print("   pip install python-pptx pillow matplotlib pydub")
    print("\n2. Подготовьте материалы:")
    print("   - Логотип компании")
    print("   - Фотографии команды")
    print("   - Изображения продуктов/услуг")
    print("   - Логотипы клиентов/партнеров")
    print("   - Фоновая музыка (MP3, 1.5-2 минуты)")
    print("\n3. Отредактируйте presentation_config.json")
    print("\n4. Запустите presentation_creator.py")
    print("\n5. Проверьте результат в файле company_presentation_final.pptx")