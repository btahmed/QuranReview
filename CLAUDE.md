# QuranReview — Guide Claude (repo production)

> Ce repo est la version **production** hébergée sur GitHub Pages.
> Le repo de développement actif est `quran-last-version`.

## Déploiements

| | URL | Stack |
|-|-----|-------|
| **Site live** | https://quranreview.live | GitHub Pages (PWA statique) |
| **API** | https://api.quranreview.live | Django + DRF (Render.com) |

## Stack technique

- **Frontend** : Vanilla JS monolithique (`script.js`), CSS, PWA
- **Backend** : Django 4.x + DRF, PostgreSQL (Render.com)
- **Auth** : JWT (SimpleJWT)

## Lancer en local

```bash
# Frontend seul (site statique)
python -m http.server 8000
# Ouvrir http://localhost:8000

# App complète avec Docker (voir quran-last-version pour ES modules)
docker-compose up --build
```

## Structure

```
QuranReview/
├── index.html         # Application complète (GitHub Pages live)
├── script.js          # JS monolithique (~5000 lignes)
├── style.css          # Styles
├── sw.js              # Service Worker PWA
├── manifest.json      # PWA manifest
├── CNAME              # quranreview.live
├── backend/           # Django API
├── frontend/          # Version Docker (dev)
├── audio/             # MP3 local (non commité, ~1.6GB)
├── docker-compose.yml
└── docs/              # Documentation
```

## Audio

| Option | URL |
|--------|-----|
| CDN (défaut) | `https://audio.qurancdn.com/audio/ar.abdul_basit_mujawwad/001.mp3` |
| Local | `audio/abdul_basit/001.mp3` … `114.mp3` |

## Rôles

| Rôle | Accès |
|------|-------|
| `student` | Mémorisation, Ward, Hifz, Competition, MyTasks |
| `teacher` | Page Teacher + gestion tâches/soumissions |
| `admin` | Gestion complète |

## API Backend clés

```
POST /api/auth/login/
POST /api/auth/register/
GET  /api/tasks/
GET  /api/competition/
GET  /api/hifz/
POST /api/audio/submissions/
```

## Notes

- `quran-last-version` = repo de dev actif avec ES modules — c'est là que les features sont développées
- Ce repo (`QuranReview`) = version stable/production — sync manuellement depuis quran-last-version
- `render.yaml` à la racine → déploiement automatique sur Render.com (rootDir: backend)
