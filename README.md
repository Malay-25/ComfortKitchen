# 🍲 ComfortKitchen – A Personal Recipe Book

**ComfortKitchen** is a web-based cookbook application designed to help users create, manage, and browse their favorite recipes in a warm, cozy digital space. Built with modern web technologies, it offers an intuitive and visually pleasing interface for everyday cooks and food enthusiasts alike.

---

## ✨ Features

- 📝 Add, view, and edit your personal recipes
- 📸 Upload images for each recipe
- 🏷️ Tag-based categorization
- 🔍 Search recipes by title
- 📋 Ingredient checklist and step-by-step instructions
- 📦 Image and data persistence using PostgreSQL
- 🎨 Cozy and responsive design with a custom logo and font

---

## 🛠️ Technologies Used

| Stack        | Technologies                             |
|--------------|------------------------------------------|
| Frontend     | React, Bootstrap, CSS                    |
| Backend      | Django, Django REST Framework            |
| Database     | PostgreSQL                               |
| Dev Tools    | VSCode, Git                              |

---

## 📁 Project Structure
```plaintext
ComfortKitchen/
├── cookbook/               # Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── ...
├── cookbook-frontend/      # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
├── media/                  # Uploaded recipe images
├── recipes/                # Django app for recipe logic
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   ├── urls.py
│   └── ...
├── venv/                   # Python virtual environment
├── manage.py
└── requirements.txt
```


---

## 🚀 Getting Started

### Prerequisites

- Node.js & npm
- Python 3.8+
- PostgreSQL

### Backend Setup (Django)

```bash
cd ComfortKitchen
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### Frontend Setup (React)
```bash
cd cookbook-frontend
npm install
npm start
```

---

## 🧠 Learning Outcomes

- Full-stack development using Django and React
- RESTful API creation and integration
- Database modeling with PostgreSQL
- Frontend UI/UX customization
- Git & version control best practices

---

## 📸 Screenshots

### Home Page
<img width="1608" height="3478" alt="Home_Page" src="https://github.com/user-attachments/assets/c66e334f-ec7b-4dcf-9c78-2d11f159fad7" />


## Recipe Detail Page
<img width="1608" height="3166" alt="Recipe_Detail_Page" src="https://github.com/user-attachments/assets/cee2714c-659d-44a6-891c-b3a3eb9c2f96" />

## Add Recipe Page
<img width="1640" height="2360" alt="Add_Recipe_Page" src="https://github.com/user-attachments/assets/4beb6529-078e-4d17-9959-3e0d6895b0ee" />

---

## 📌 Important Files

| File / Folder                       | Purpose                   |
| ----------------------------------- | ------------------------- |
| `cookbook/settings.py`              | Django project settings   |
| `recipes/models.py`                 | Database models           |
| `recipes/views.py`                  | Backend logic for recipes |
| `recipes/serializers.py`            | DRF serialization         |
| `src/` (inside `cookbook-frontend`) | All frontend React code   |
| `media/`                            | Uploaded recipe images    |

---

## 📃 License

This project is developed as part of an academic internship and is intended for educational purposes only.

---

## 🙌 Acknowledgements

- React
- Django
- Bootstrap
- PostgreSQL

---

## 👤 Author

**Malay Sidapara**  
[GitHub](https://github.com/Malay-25)  
Email: malaysidapara2003@gmail.com
