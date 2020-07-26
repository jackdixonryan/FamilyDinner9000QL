# DnD Organizer
This is a project to help organize a dnd campaign.  This can be used by players or by the dungeon master. 

Currently, we only have spells.

# How to run
1. npm install --save
1. create a file .env.dev containing
```
MONGO_URL=mongodb+srv://jackryan:2MGOLfcz49k5RUBn@cluster0.x1uxc.gcp.mongodb.net/5erpc?retryWrites=true&w=majority
PORT=9000
```
1. npm run dev
1. http://localhost:9000/graphql
Once in the GraphQL interface, you can query our spell library!

# Examples
Return a list of all spells in our db: 
```
{
   spells {
      slug
      id
      name
      desc
      higher_level
      page
      range
      components
      material
      ritual
      duration
      concentration
      casting_time
      level
      school
      classes
      archetype
      circles
   }
}
```

Return a specific spell by name
```
{       
   spell(slug: "acid-arrow") {
      slug
      id
      name
      desc
      higher_level
      page
      range
      components
      material
      ritual
      duration
      concentration
      casting_time
      level
      school
      classes
      archetype
      circles
   }
}
```

Return spells that a given class can use
```
{
  spellsByClass(class:"Paladin"){
    name,
    desc,
    range,
    higher_level,
    components,
    duration,
    concentration,
    level,
    archetype
  }
}
```

Return spells that a given class and level can use
```
{
  spellsByClassAndLevel(class:"Paladin", level:3){
    name,
    desc,
    range,
    higher_level,
    components,
    duration,
    concentration,
    level,
    archetype
  }
}
```