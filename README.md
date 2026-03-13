# QuranReview 🕌

🌐 **Site live :** [https://quranreview.live](https://quranreview.live)

Application professionnelle pour la mémorisation et révision du Coran — PWA avec backend Django.

## Stack

- **Frontend** : Vanilla JS, PWA, CSS (GitHub Pages)
- **Backend** : Django + DRF + PostgreSQL (Render.com)
- **Auth** : JWT

## Fonctionnalités

- 📖 Mémorisation avec répétition espacée
- 🎵 Ward — lecteur audio quotidien
- 🏋️ Hifz — exercices 5 niveaux
- 🏆 Compétition — défis et classements
- 👨‍🏫 Espace enseignant — tâches & soumissions audio
- 📊 Progression & analytics
- 🌙 Thème clair/sombre | 📱 PWA installable

## Démarrer

```bash
# Frontend seul
python -m http.server 8000

# App complète Docker
docker-compose up --build
```

## Structure

```
QuranReview/
├── index.html / script.js / style.css / sw.js  # Site GitHub Pages live
├── backend/       # Django API
├── frontend/      # Version Docker avec ES Modules
├── docker-compose.yml
└── docs/          # Documentation (audio, déploiement)
```

---
*Made with ❤️ for Quran learners*
