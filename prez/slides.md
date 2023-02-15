---
# try also 'default' to start simple
theme: seriph
download: true
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://source.unsplash.com/collection/94734566/1920x1080
# apply any windi css classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# some information about the slides, markdown enabled
info: |
  ## POC imports

  Présentation d'un poc
  d'import de données via
  [TableSchema](https://guides.etalab.gouv.fr/producteurs-schemas/aide-construction-tableschema) 
fonts:
  local: 'Marianne'
---

# POC import de données 🚀

via TableSchema


---

## Objectifs



L'objectif de ce poc est:
- 🗹 mettre en place des schema pour chaque indicateur
- ☐ mettre en place une plateforme de vérification d'un csv contre un schema
- ☐ communiquer clairement sur les erreurs du fichier contre le schéma


---

## Idée du projet

Enchainer une validation de données avec un import en base de données:

![a](/poc-imports-Page-1.drawio.png)


---

## Périmètres

Les périmètres 1 et 2 sont à tester:

![a](/poc-imports-Perimetre_du_POC.png)



---

## Périmètre 1 - Questions



---

## Ce dont on dispose

On dispose aujourd'hui des éléments suivants:
- des schéma de données
- des données
- des administrations/ministères/SI prêts à embarquer

Mais quel validateur ?


---

## Quel validateur ?

### Critères

On voudrait un validateur qui suive ces critères:
- communiquer explicitement les erreurs (customisation des messages d'erreur)
- utiliser des schemas privés (en tout cas pas sur schema.data.gouv car pas de publi directe sur data.gouv)
- self host pour importer des données non publiques (à terme, mais on peut commencer par de l'open data?)
- via API ou UI
- pouvoir transferer le fichier vers un second service, service d'import à priori (pas nécessaire, surement à coder par ailleurs code UI externe)
- restreindre la liste de schemas dans le menu déroulant (code UI externe)

### Des candidats ?

- Travaux du [Test Bed](https://www.itb.ec.europa.eu/docs/guides/latest/validatingCSV) de la CE, et son [instance](https://www.itb.ec.europa.eu/csv/any/upload)
- [Validata](https://validata.fr/) Validateur par OpenDataFrance
- publier.etalab.studio mais sans la partie "publication sur data.gouv" + schéma privés. Possible ?

---


MISC:

faire un schéma / indic pour par ex, empecher l'import régional.

---

## Outils de construction


Outils de création de schémas:
- https://guides.etalab.gouv.fr/producteurs-schemas



---
layout: center
class: text-center
---

# Learn More

[Documentations](https://sli.dev) / [GitHub Repo](https://github.com/slidevjs/slidev)
