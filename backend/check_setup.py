#!/usr/bin/env python3
"""
Скрипт для проверки готовности проекта SkateGo к развертыванию
"""

import os
import sys
from pathlib import Path

def check_file_exists(file_path, description):
    """Проверяет существование файла"""
    if os.path.exists(file_path):
        print(f"✅ {description}: {file_path}")
        return True
    else:
        print(f"❌ {description}: {file_path} - НЕ НАЙДЕН")
        return False

def check_directory_structure():
    """Проверяет структуру директорий"""
    print("\n📁 Проверка структуры проекта:")
    
    required_dirs = [
        "skatego/core",
        "skatego/users", 
        "skatego/reviews",
        "skatego/api",
        "skatego/skatego"
    ]
    
    all_exist = True
    for dir_path in required_dirs:
        if os.path.exists(dir_path):
            print(f"✅ Директория: {dir_path}")
        else:
            print(f"❌ Директория: {dir_path} - НЕ НАЙДЕНА")
            all_exist = False
    
    return all_exist

def check_django_files():
    """Проверяет наличие Django файлов"""
    print("\n🐍 Проверка Django файлов:")
    
    django_files = [
        ("skatego/manage.py", "Django manage.py"),
        ("skatego/skatego/settings.py", "Django settings.py"),
        ("skatego/skatego/urls.py", "Django urls.py"),
        ("skatego/skatego/wsgi.py", "Django wsgi.py"),
        ("skatego/core/models.py", "Core models.py"),
        ("skatego/users/models.py", "Users models.py"),
        ("skatego/reviews/models.py", "Reviews models.py"),
    ]
    
    all_exist = True
    for file_path, description in django_files:
        if not check_file_exists(file_path, description):
            all_exist = False
    
    return all_exist

def check_docker_files():
    """Проверяет Docker файлы"""
    print("\n🐳 Проверка Docker файлов:")
    
    docker_files = [
        ("Dockerfile", "Dockerfile"),
        ("docker-compose.yml", "Docker Compose"),
        ("requirements.txt", "Python requirements"),
    ]
    
    all_exist = True
    for file_path, description in docker_files:
        if not check_file_exists(file_path, description):
            all_exist = False
    
    return all_exist

def check_documentation():
    """Проверяет документацию"""
    print("\n📚 Проверка документации:")
    
    doc_files = [
        ("README.md", "README.md"),
        ("ApplicationLogic.md", "Бизнес-логика"),
        (".gitignore", ".gitignore"),
    ]
    
    all_exist = True
    for file_path, description in doc_files:
        if not check_file_exists(file_path, description):
            all_exist = False
    
    return all_exist

def check_migrations():
    """Проверяет наличие миграций"""
    print("\n🔄 Проверка миграций:")
    
    migration_dirs = [
        "skatego/core/migrations",
        "skatego/users/migrations",
        "skatego/reviews/migrations",
    ]
    
    all_exist = True
    for dir_path in migration_dirs:
        if os.path.exists(dir_path):
            # Проверяем наличие __init__.py
            init_file = os.path.join(dir_path, "__init__.py")
            if os.path.exists(init_file):
                print(f"✅ Миграции: {dir_path}")
            else:
                print(f"⚠️  Миграции: {dir_path} - нет __init__.py")
        else:
            print(f"❌ Миграции: {dir_path} - НЕ НАЙДЕНА")
            all_exist = False
    
    return all_exist

def main():
    """Основная функция проверки"""
    print("🚀 Проверка готовности проекта SkateGo к развертыванию")
    print("=" * 60)
    
    checks = [
        check_directory_structure(),
        check_django_files(),
        check_docker_files(),
        check_documentation(),
        check_migrations(),
    ]
    
    print("\n" + "=" * 60)
    
    if all(checks):
        print("🎉 ВСЕ ПРОВЕРКИ ПРОЙДЕНЫ! Проект готов к развертыванию.")
        print("\n📋 Следующие шаги:")
        print("1. docker-compose up --build")
        print("2. docker-compose exec web python skatego/manage.py createsuperuser")
        print("3. Откройте http://localhost:8000")
        return True
    else:
        print("❌ НЕКОТОРЫЕ ПРОВЕРКИ НЕ ПРОЙДЕНЫ!")
        print("Исправьте указанные проблемы перед развертыванием.")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1) 