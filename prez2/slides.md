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
  ## POC imports - Checks

  Présentation d'un poc
  d'import de données via
  [TableSchema](https://guides.etalab.gouv.fr/producteurs-schemas/aide-construction-tableschema).
  Suite avec quelques implémentations de checks.
fonts:
  local: "Marianne"
---

# POC import de données 🚀 - Checks

via TableSchema




---

# Intro

A la suite de discussions avec Etalab et l'ANCT, nous souhaitons poursuivre l'utilisation du standard *TableSchema* (déjà largement utilisé sur *data.gouv.fr* et *transport.data.gouv.fr*) pour la vérification de données.

En effet, le respect de ce standard permet une uniformisation des données et un meilleur suivi et circulation de celles-ci. La solution *TableSchema* est une solution simple pour **documenter la structure de fichiers de données tabulaires**. Un validateur en ligne hébergé par Etalab permet de vérifier des données sans implémenter un nouveau moteur de validation, ce qui présente un **gain de temps considérable**.

Néanmoins, ce type de validation est **statique** et ne permet pas de réaliser toutes les vérifications de cohérence des données (*check*). Dans ce document, je vais donc vous présenter le cadre dans lequel la solution *TableSchema* est **pertinente et efficace**:
- *1- Check statiques*

et le reste des points de contrôle de cohérence pour lesquels elle n'est **pas suffisante**:

- *2.1- Checks fonctionnels* | Existence
- *2.2- Checks fonctionnels* | Autorisation
- *2.3- Checks fonctionnels* | Analytiques


---

# 1- Check statiques

Les vérifications *statiques* sont des vérifications simples sur le formattage des données, sans entrer dans leur sens.

Par exemple:
- vérifier une valeur contre une expression régulière
- mettre des valeurs min/max
- s'assurer qu'une cellule n'est pas vide


*Implémentation:* Simple avec un *TableSchema* et un validateur.



---

# 2- Checks fonctionnels
Les vérifications *fonctionnelles* ont pour but de vérifier si les données entrées **ont du sens**. On ne va tester ces vérifications **uniquement si les checks statiques sont passés**.


---

# 2- Checks fonctionnels
Les vérifications *fonctionnelles* ont pour but de vérifier si les données entrées **ont du sens**. On ne va tester ces vérifications **uniquement si les checks statiques sont passés**.
## 2.1- Existence




<div class="grid grid-cols-2 gap-4">
<div v-click=1>


Contrainte de clé étrangère:

<img src="/fk.png" width="350"/>


</div>
<div>


Les **checks d'existence** ont pour but de vérifier les les entitées manipulées existent ou non. Pour cela, on a besoin de vérifier leur présence ou non dans la base de données.

*Implémentation:* 
- Simple. A l'aide de clés étrangères (FK) dans la base de données.


</div>
</div>


---

# 2- Checks fonctionnels
Les vérifications *fonctionnelles* ont pour but de vérifier si les données entrées **ont du sens**. On ne va tester ces vérifications **uniquement si les checks statiques sont passés**.
## 2.2- Autorisation

Les **checks d'autorisation** ont pour objet de:
- vérifier si un utilisateur est autorisé à modifier ces données. Cela doit se faire en cohérence avec les droits définis dans l'application.

*Implémentation:* 
- Moyen. A l'aide des rôles définis par utilisateur. Ces rôles ne sont pas encore implémentés.



---

# 2- Checks fonctionnels
Les vérifications *fonctionnelles* ont pour but de vérifier si les données entrées **ont du sens**. On ne va tester ces vérifications **uniquement si les checks statiques sont passés**.
## 2.3- Analytiques

Les **checks analytiques** ont pour objet de 
- tester la cohérence des données au regard de leur **sens pour le métier**

Par exemple, on pourrait vouloir vérifier qu'il n'y a pas une trop grande variance de la valeur d'un indicateur d'un mois sur l'autre. Ou encore une connaissance métier pourrait nous pousser à vérifier que la somme des valeurs des X derniers mois est inférieure à une valeur Y.

*Implémentation:* 
- Complexe. A l'aide de connaissances métiers poussées et mise en place technique complexe.




---

# Checks - Résumé

Voici les différents types de vérification, une proposition d'implémentation et leur complexité estimée:

| Type        |     | Nom          | Complexité | Nécessite           | Erreurs couvertes |
|-------------|-----|--------------|------------|--------------------------|---|
| Statique    | 1   | Statique     | ![](https://img.shields.io/badge/%E2%AD%90-green)          | *TableSchema* + validateur | ![](https://progress-bar.dev/50/) |
| Fonctionnel | 2.1 | Existence    | ![](https://img.shields.io/badge/%E2%AD%90-green)         | Db + FK                  | ![](https://progress-bar.dev/25/) |
| Fonctionnel | 2.2 | Autorisation | ![](https://img.shields.io/badge/%E2%AD%90%E2%AD%90-yellow)         | Rôles            | ![](https://progress-bar.dev/20/) |
| Fonctionnel | 2.3 | Analytique   | ![](https://img.shields.io/badge/%E2%AD%90%E2%AD%90%E2%AD%90-red)        | Outil annexe + métier    | ![](https://progress-bar.dev/5/)  |

*Note:* 
- Le *2.3* me semble hors périmètre pour le moment.
- La colonne *Erreurs couvertes* présente une estimation de la fréquence de l'erreur sur le total d'erreurs rencontrées. Par exemple, le type **2.2** représente 20% du total des erreurs.

---

# Check workflow 1/2

Voici un enchainement logique des différents checks: 

<img src="/poc-imports-with_errors.png"/>


---

# Check workflow 2/2

Et le périmètre du POC:

<img src="/poc-imports-with_errors_perim.png"/>

---

# Implémentations

J'ai démarré des implémentations pour certaines de ces vérifications.

Je vais vous présenter les différents travaux que j'ai réalisés sur les:
- 1. Test Statique
- 2.1 Test d'existence
- 2.2 Test d'autorisation - en attente des rôles
- 2.3 Analytiques - pas démarré / hors périmètre


---

# Implémentations
## 1- Statique


Définition de **tests statiques** à l'aide de [*TableSchema*](https://specs.frictionlessdata.io/table-schema/) et de l'[API Validata](https://api.validata.etalab.studio/apidocs) + interface de saisie.



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

Tests d'existence compatibles avec le second modèle de données que j'ai mis en place (présenté à Fabien et Louise) contenant la notion de **revisions** (pour l'historisation).



<div class="grid grid-cols-2 gap-4">
<div>




<img src="/model-fk.png" width="350"/>

*Extrait du modèle*

</div>
<div>


Ce modèle contient une unique table par entité (Chantier, PPG, Porteur, Zone, ...) avec une **contrainte sur l'identifiant** de l'entité qui **doit exister dans une table de référence**.


</div>
</div>


Si l'on tente d'insérer une entité dont l'identifiant n'est pas dans la table de référence, la base de données va retourner une erreur qui pourra être transmise à l'utilisateur final.



---

# Implémentations
## 2.2- Autorisation

Dépend de l'implémentation choisie pour les rôles. Rappel de ma modélisation par *preset/roles* (présenté à Sébastien et Yannick).


<div class="grid grid-cols-2 gap-4">
<div>



```ts {7-13|all}
role:
  - nom: prefet-R84
    preset:
      - nom: pref-X
        params:
          - zone-id: "R84"
  - nom: "perso-1"
    preset:
      - nom: pref-X
        params:
          - zone-id: "R84"
      - nom: visitor-91
        params: []
```

*Role* `perso-1`, composé des preset `pref-X` et `visitor-91`


</div>
<div>

```yml
preset:
  - nom: visitor-91
    zone:
      show: ["D91"]
      hide: []
      recursiveOn: []
    chantier:
      show: ["CH-005", "PER-03"]
      hide: []
    blocs:
      edit: []
      hide: ["id:meteo", "id:synthese"]
```

*Preset* `visitor-91`

</div>
</div>


---

# Implémentations
## 2.3- Analytique

Je n'ai rien démarré sur ce sujet.