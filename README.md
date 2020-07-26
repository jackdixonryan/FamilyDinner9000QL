# DnD Organizer
This is a project to help organize a dnd campaign.  This can be used by players or by the dungeon master. 

Currently, we only have spells.

# How to run
* npm install --save
* create a file .env.dev containing
   (Get the mongo URL from jack/carolyn)
```
MONGO_URL=<url>
PORT=9000
```
* npm run dev
* http://localhost:9000/graphql
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
  spells(class:"Paladin"){
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
  spells(class:"Paladin", level:3){
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