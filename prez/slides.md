---
# try also 'default' to start simple
theme: seriph
download: true
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://images.unsplash.com/photo-1545243424-0ce743321e11?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8c3BhY2Usc3VufHx8fHx8MTY3NjQ5NTQ5NQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600
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
  local: "Marianne"
---

# POC import de données 🚀

via TableSchema


---


# Contexte / Etat des lieux

<div class="grid grid-cols-2 gap-4">
<div>


Workflow actuel

![a](/workflow-origin.png)

</div>
<div v-click=1>



Workflow visé

![a](/workflow-origin-new.png)

</div>
</div>


---

# Contexte / Idée d'interface

Projet d'une nouvelle interface d'import:

<div >


<img src="/poc-imports-wireframe.png" width="500"/>

</div>

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

## Raison d'être des TableSchema

Les TableSchema ont été construits pour modéliser des objets réels (arbres, batiments, ...).

Ici, on s'en servirait pour valider des entités qui n'ont pas de réalité matérielle (un fichier CSV avec les colonnes qui nous intéressent) et on en voudrait un très grand nombre.

*Est-ce un bon usage des TableSchema ?*

---

## Ce dont on dispose

On dispose aujourd'hui des éléments suivants:
- des schéma de données
- des **données**
- des administrations/ministères/SI prêts à embarquer


<div v-click> 
<p>

## **Mais quel validateur ?**

</p>
</div>
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

# ?


Interrogations:
- comment passer d'un json-schema a tableschema
- bonne idée d'avoir 500 schema ? J'ai vu qu'on pouvait combiner des schema. Donc un schema general + des patch pour chaque indic ?
- le plus simple pour avoir un validateur avec tous mes schema est surement d'étendre une API de validation pour en créer une nouvelle avec mes messages de validations ?
- data package, pas utile dans notre cas ? 
- repo github pour héberger ces schema
- quels outils d'aide construction de schema ? Comme Stoplight ou Swagger pour les API OpenApi ou [bjdash.github.io](https://bjdash.github.io/JSON-Schema-Builder/)

---

## Outils de construction


Outils de création de schémas:
- https://guides.etalab.gouv.fr/producteurs-schemas
- https://create.frictionlessdata.io/




---
layout: center
class: text-center
---

# Learn More

[Documentations](https://sli.dev) / [GitHub Repo](https://github.com/slidevjs/slidev)
