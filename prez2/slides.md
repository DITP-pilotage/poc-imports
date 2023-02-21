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

# POC import de données 🚀 SP

via TableSchema


---



---

# 1- Check statiques

Les vérifications *statiques* sont des vérifications simples sur le formattage des données, sans entrer dans leur sens.

Par exemple:
- vérifier une valeur contre une expression régulière
- mettre des valeurs plancher/seuil
- s'assurer qu'une cellule n'est pas vide


*Implémentation:* Simple avec un *TableSchema* et un validateur.


---

# 2- Checks fonctionnels

Les vérifications *fonctionnelles* ont pour but de vérifier si les données entrées ont du sens. On ne va tester ces vérifications uniquement si les checks statiques sont passés.


---

# 2- Checks fonctionnels
## 2.1- Existence




<div class="grid grid-cols-2 gap-4">
<div v-click=1>


Contrainte de clé étrangère:

<img src="/fk.png" width="350"/>


</div>
<div>


Les **checks d'existence** ont pour but de vérifier les les entitées manipulées existent ou non. Pour cela, on a besoin de vérifier leur présence ou non dans la base de données.

*Implémentation:* Simple. A l'aide de clés étrangères (FK) dans la base de données.


</div>
</div>


---

# 2- Checks fonctionnels
## 2.2- Autorisation

Les **checks d'autorisation** ont pour objet de vérifier si un utilisateur est autorisé à modifier ces données. Cela doit se faire en cohérence avec les droits définis dans l'application.

*Implémentation:* Moyen. A l'aide des rôles définis par utilisateur. Ces rôles ne sont pas encore implémentés.



---

# 2- Checks fonctionnels
## 2.3- Analytiques

Les **checks analytiques** ont pour objet de tester la cohérence des données au regard de leur sens pour le métier. 

Par exemple, on pourrait vouloir vérifier qu'il n'y a pas une trop grande variance de la valeur d'un indicateur d'un mois sur l'autre. Ou encore une connaissance métier pourrait nous pousser à vérifier que la somme des valeurs des X derniers mois est inférieurs à une valeur Y.






*Implémentation:* Complexe. A l'aide de connaissances métiers poussées et mise en place technique complexe.


---

# Checks - Résumé

Voici les différents types de vérification, une proposition d'implémentation et sa complexité estimée:

| Type        |     | Nom          | Complexité | Nécessite           |
|-------------|-----|--------------|------------|--------------------------|
| Statique    | 1   | Statique     | ![](https://img.shields.io/badge/%E2%AD%90-green)          | *TableSchema* + validateur |
| Fonctionnel | 2.1 | Existence    | ![](https://img.shields.io/badge/%E2%AD%90-green)         | Db + FK                  |
| Fonctionnel | 2.2 | Autorisation | ![](https://img.shields.io/badge/%E2%AD%90%E2%AD%90-yellow)         | Rôles            |
| Fonctionnel | 2.3 | Analytique   | ![](https://img.shields.io/badge/%E2%AD%90%E2%AD%90%E2%AD%90-red)        | Outil annexe + métier    |

*Note:* Le *2.3* me semble hors périmètre pour le moment.



---

# Implémentations

J'ai démarré des implémentations pour certains de ces checks


---

# Implémentations
## 1- Statique


Définition de **tests statiques** à l'aide de [*TableSchema*](https://specs.frictionlessdata.io/table-schema/) et de l'[API Validata](https://api.validata.etalab.studio/apidocs).



<div class="grid grid-cols-2 gap-4">
	<div>

<img src="/poc-screen.png" width="450"/>

Page d'import/validation de données, après sélection du schéma adéquat

*(interface disponible sur notre serveur de test)*

</div>
<div>


```json
{
 "name":"metric_type",
 "description":"Type de la donnée importée. vi/va/vc",
 "example":"vi",
 "type":"string",
 "constraints":{
    "required":true,
    "enum":[
       "vi",
       "va",
       "vc"
    ]
 }
}
```

Extrait du *TableSchema* sélectionné

</div>



</div>



---

# Implémentations
## 1- Statique


Définition de **messages d'erreurs personnalisés** pour communiquer au métier avec des termes simples. Le but est d'intercepter les messages d'erreur de validation de Validata, et de les remplacer par nos messages personnalisés.



<div class="grid grid-cols-2 gap-4">
	<div>

```yaml
errors:
  - nom: "metric_type vi/va/vc non respectée"
    validata:
      fieldName: "metric_type"
      code: "constraint-error"
      note: "constraint \"enum\" is \"['vi', 'va', 'vc']\""
    message: |
    	Le type de valeur doit être vi (valeur initiale), 
    	va (valeur actuelle) 
    	ou vc (valeur cible).
```

Extrait de la liste des messages d'erreurs personnalisés

</div>
<div>


```json
{
 "name":"metric_type",
 "description":"Type de la donnée importée. vi/va/vc",
 "example":"vi",
 "type":"string",
 "constraints":{
    "required":true,
    "enum":[
       "vi",
       "va",
       "vc"
    ]
 }
}
```

Extrait du *TableSchema*

</div>



</div>




---

# Implémentations
## 2.1- Existence