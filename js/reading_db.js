// Database of Reading questions parsed from markdown documents
const readingDB = {
  meta: {
    part1Version: "p1-ca37ffc77e7e"
  },
  part1: [
  {
    "id": 1,
    "sender": "Hey Lewis,",
    "template": [
      "You can catch the next train at the ",
      " near the city center.\nThe number 5 bus ",
      " right in front of my house.\nWait until the light turns ",
      " before you cross the street.\nMy family likes to eat ",
      " together in the evening.\nMy little brother loves watching ",
      " every Saturday night.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "station",
        "options": [
          "station",
          "school",
          "market"
        ],
        "readonly": true
      },
      {
        "correct": "stops",
        "options": [
          "runs",
          "stops",
          "flies"
        ],
        "readonly": false
      },
      {
        "correct": "green",
        "options": [
          "red",
          "yellow",
          "green"
        ],
        "readonly": false
      },
      {
        "correct": "dinner",
        "options": [
          "breakfast",
          "lunch",
          "dinner"
        ],
        "readonly": false
      },
      {
        "correct": "films",
        "options": [
          "books",
          "films",
          "hotdog"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 2,
    "sender": "Hey Lewis,",
    "template": [
      "She likes to go jogging in the ",
      " before breakfast.\nAll of my ",
      " came to my birthday party.\nPlease don't ",
      " your shoes in the hallway.\nFresh vegetables are really ",
      " for children.\nThe restaurant serves delicious ",
      " at a fair price.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "morning",
        "options": [
          "morning",
          "sea",
          "roof"
        ],
        "readonly": true
      },
      {
        "correct": "friends",
        "options": [
          "friends",
          "dog",
          "tree"
        ],
        "readonly": false
      },
      {
        "correct": "leave",
        "options": [
          "leave",
          "go",
          "love"
        ],
        "readonly": false
      },
      {
        "correct": "good",
        "options": [
          "hate",
          "lovely",
          "good"
        ],
        "readonly": false
      },
      {
        "correct": "food",
        "options": [
          "food",
          "books",
          "games"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 3,
    "sender": "Hey Lewis,",
    "template": [
      "What time will you be ",
      " tonight?\nThe shop assistant was very polite to the ",
      " this morning.\nThis exercise looks quite ",
      " to me.\nWhat time do you usually ",
      " lunch for your kids?\nI like to ",
      " the news before going to bed.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "home",
        "options": [
          "home",
          "sea",
          "park"
        ],
        "readonly": true
      },
      {
        "correct": "customers",
        "options": [
          "customers",
          "bird",
          "chair"
        ],
        "readonly": false
      },
      {
        "correct": "easy",
        "options": [
          "easy",
          "go",
          "bring"
        ],
        "readonly": false
      },
      {
        "correct": "prepare",
        "options": [
          "prepare",
          "big",
          "team"
        ],
        "readonly": false
      },
      {
        "correct": "watch",
        "options": [
          "watch",
          "read",
          "take"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 4,
    "sender": "Hey Lewis,",
    "template": [
      "Children love to play in the ",
      " after school.\nThe new gym offers dance ",
      " every weekend.\nThis math problem is quite ",
      " to solve.\nWhat do you usually cook for ",
      " on weekends?\nMy mother does ",
      " every morning to feel calm.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "park",
        "options": [
          "park",
          "moon",
          "tree"
        ],
        "readonly": true
      },
      {
        "correct": "classes",
        "options": [
          "classes",
          "running",
          "books"
        ],
        "readonly": false
      },
      {
        "correct": "easy",
        "options": [
          "easy",
          "try",
          "bye"
        ],
        "readonly": false
      },
      {
        "correct": "breakfast",
        "options": [
          "breakfast",
          "love",
          "cold"
        ],
        "readonly": false
      },
      {
        "correct": "meditation",
        "options": [
          "meditation",
          "book",
          "healthy"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 5,
    "sender": "Hey Lewis,",
    "template": [
      "The people in my hometown are very ",
      " to visitors.\nI prefer to ",
      " to the market instead of driving.\nWhere did you meet your best friend ",
      "?\nCan your sister ",
      " Japanese fluently?\nWe usually go camping ",
      " every summer.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "friendly",
        "options": [
          "friendly",
          "hate",
          "big"
        ],
        "readonly": true
      },
      {
        "correct": "walk",
        "options": [
          "run",
          "walk",
          "buy"
        ],
        "readonly": false
      },
      {
        "correct": "first",
        "options": [
          "first",
          "love",
          "bring"
        ],
        "readonly": false
      },
      {
        "correct": "speak",
        "options": [
          "speak",
          "big",
          "most"
        ],
        "readonly": false
      },
      {
        "correct": "together",
        "options": [
          "alone",
          "together",
          "morning"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 6,
    "sender": "Hey Lewis,",
    "template": [
      "Every morning, he rides his ",
      " to the office.\nThe trees in this forest are extremely ",
      ".\nThere are lots of tall ",
      " along this street.\nWe always have ",
      " together before work.\nOn weekends, I enjoy playing board ",
      " with my siblings.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "bicycle",
        "options": [
          "spaceship",
          "plane",
          "bicycle"
        ],
        "readonly": true
      },
      {
        "correct": "tall",
        "options": [
          "hate",
          "tall",
          "went"
        ],
        "readonly": false
      },
      {
        "correct": "trees",
        "options": [
          "road",
          "buy",
          "trees"
        ],
        "readonly": false
      },
      {
        "correct": "breakfast",
        "options": [
          "breakfast",
          "lunch",
          "dinner"
        ],
        "readonly": false
      },
      {
        "correct": "games",
        "options": [
          "games",
          "make",
          "time"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 7,
    "sender": "Hey Lewis,",
    "template": [
      "Next month, I plan to ",
      " my old university friends.\nMy ",
      " has a large window facing the garden.\nIt has been extremely ",
      " this whole week.\nWe traveled to the countryside by ",
      ".\nMy cousin can ",
      " three languages fluently.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "visit",
        "options": [
          "visit",
          "clean",
          "run"
        ],
        "readonly": true
      },
      {
        "correct": "room",
        "options": [
          "room",
          "father",
          "mother"
        ],
        "readonly": false
      },
      {
        "correct": "hot",
        "options": [
          "big",
          "hot",
          "small"
        ],
        "readonly": false
      },
      {
        "correct": "train",
        "options": [
          "spaceship",
          "plane",
          "train"
        ],
        "readonly": false
      },
      {
        "correct": "speak",
        "options": [
          "make",
          "speak",
          "love"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 8,
    "sender": "Hey Lewis,",
    "template": [
      "My grandparents own a small ",
      " outside the city.\nEveryone in the class felt very ",
      " about the field trip.\nPlease turn ",
      " when you reach the traffic light.\nWe strolled along the busy ",
      " near the market.\nI always ",
      " a glass of juice before breakfast.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "farm",
        "options": [
          "farm",
          "compare",
          "spare"
        ],
        "readonly": true
      },
      {
        "correct": "excited",
        "options": [
          "run",
          "excited",
          "most"
        ],
        "readonly": false
      },
      {
        "correct": "left",
        "options": [
          "big",
          "left",
          "go"
        ],
        "readonly": false
      },
      {
        "correct": "street",
        "options": [
          "water",
          "street",
          "cloud"
        ],
        "readonly": false
      },
      {
        "correct": "drink",
        "options": [
          "stone",
          "drink",
          "school"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 9,
    "sender": "Hey Lewis,",
    "template": [
      "My whole family stays ",
      " on public holidays.\nMy older brother can ",
      " a truck safely.\nI really enjoy chatting with my ",
      " during lunch break.\nLet's take a short ",
      " along the riverside.\nThe garden looks really ",
      " in spring.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "home",
        "options": [
          "cloud",
          "home",
          "road"
        ],
        "readonly": true
      },
      {
        "correct": "drive",
        "options": [
          "fly",
          "drive",
          "big"
        ],
        "readonly": false
      },
      {
        "correct": "friends",
        "options": [
          "tree",
          "friends",
          "go"
        ],
        "readonly": false
      },
      {
        "correct": "walk",
        "options": [
          "walk",
          "big",
          "sea"
        ],
        "readonly": false
      },
      {
        "correct": "pretty",
        "options": [
          "pretty",
          "father",
          "went"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 10,
    "sender": "Hey Lewis,",
    "template": [
      "I would like to visit a different ",
      " next year.\nPlease make sure to keep the kitchen ",
      " after cooking.\nWe have a math ",
      " every Tuesday morning.\nI really enjoy volunteering to help ",
      " students with homework.\nCould you please explain these new ",
      " in the lesson?\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "country",
        "options": [
          "country",
          "small",
          "big"
        ],
        "readonly": true
      },
      {
        "correct": "clean",
        "options": [
          "green",
          "boring",
          "clean"
        ],
        "readonly": false
      },
      {
        "correct": "class",
        "options": [
          "class",
          "lunch",
          "sea"
        ],
        "readonly": false
      },
      {
        "correct": "other",
        "options": [
          "myself",
          "father",
          "other"
        ],
        "readonly": false
      },
      {
        "correct": "words",
        "options": [
          "small",
          "bring",
          "words"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 11,
    "sender": "Hey Lewis,",
    "template": [
      "The apartment we rented last year was quite ",
      ".\nWe usually ",
      " at my aunt's house during the holidays.\nShe planted colorful roses in the ",
      ".\nSeveral old ",
      " were cut down last week.\nThat wooden bridge looks very ",
      " but it's still safe.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "small",
        "options": [
          "boring",
          "small",
          "healthy"
        ],
        "readonly": true
      },
      {
        "correct": "stay",
        "options": [
          "stay",
          "movie",
          "bring"
        ],
        "readonly": false
      },
      {
        "correct": "garden",
        "options": [
          "sky",
          "garden",
          "water"
        ],
        "readonly": false
      },
      {
        "correct": "trees",
        "options": [
          "cloud",
          "trees",
          "morning"
        ],
        "readonly": false
      },
      {
        "correct": "old",
        "options": [
          "hot",
          "old",
          "free"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 12,
    "sender": "Hey Lewis,",
    "template": [
      "I really ",
      " spending my weekends painting.\nThis jacket feels a little too ",
      " for me now.\nCould you go to the ",
      " and buy some bread?\nThere were so many ",
      " waiting outside the cinema.\nMy grandparents plan to ",
      " us during the summer break.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "love",
        "options": [
          "love",
          "make",
          "run"
        ],
        "readonly": true
      },
      {
        "correct": "small",
        "options": [
          "mean",
          "small",
          "again"
        ],
        "readonly": false
      },
      {
        "correct": "shop",
        "options": [
          "shop",
          "park",
          "sea"
        ],
        "readonly": false
      },
      {
        "correct": "people",
        "options": [
          "people",
          "birds",
          "trees"
        ],
        "readonly": false
      },
      {
        "correct": "visit",
        "options": [
          "room",
          "visit",
          "fly"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 13,
    "sender": "Hey Lewis,",
    "template": [
      "I usually go for a run early in the ",
      ".\nThe kids are flying kites in the ",
      ".\nWhat time does your flight ",
      " the airport?\nWe usually eat toast and eggs for ",
      ".\nIt was great to ",
      " you at the conference.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "morning",
        "options": [
          "morning",
          "sky",
          "free"
        ],
        "readonly": true
      },
      {
        "correct": "park",
        "options": [
          "park",
          "big",
          "hot"
        ],
        "readonly": false
      },
      {
        "correct": "leave",
        "options": [
          "leave",
          "bring",
          "stop"
        ],
        "readonly": false
      },
      {
        "correct": "breakfast",
        "options": [
          "breakfast",
          "train",
          "time"
        ],
        "readonly": false
      },
      {
        "correct": "meet",
        "options": [
          "meet",
          "hate",
          "look"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 14,
    "sender": "Hey Lewis,",
    "template": [
      "Every morning, my mother ",
      " the newspaper before breakfast.\nMy father usually rides his ",
      " to work.\nI always ",
      " my teeth twice a day.\nThe children usually ",
      " breakfast before school.\nWe often ",
      " the morning news together.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "reads",
        "options": [
          "drives",
          "reads",
          "paints"
        ],
        "readonly": true
      },
      {
        "correct": "bicycle",
        "options": [
          "kite",
          "boat",
          "bicycle"
        ],
        "readonly": false
      },
      {
        "correct": "brush",
        "options": [
          "brush",
          "cook",
          "drive"
        ],
        "readonly": false
      },
      {
        "correct": "eat",
        "options": [
          "sell",
          "swim",
          "eat"
        ],
        "readonly": false
      },
      {
        "correct": "watch",
        "options": [
          "watch",
          "drive",
          "sleep"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 15,
    "sender": "Hey Lewis,",
    "template": [
      "It usually ",
      " a lot in this region during autumn.\nThe weather here is quite ",
      " in summer.\nPeople usually wear ",
      " when it snows.\nThe sky looks quite ",
      " today.\nIn spring, flowers usually ",
      " in the garden.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "rains",
        "options": [
          "cooks",
          "rains",
          "sings"
        ],
        "readonly": true
      },
      {
        "correct": "hot",
        "options": [
          "hot",
          "cheap",
          "polite"
        ],
        "readonly": false
      },
      {
        "correct": "coats",
        "options": [
          "shorts",
          "coats",
          "sandals"
        ],
        "readonly": false
      },
      {
        "correct": "cloudy",
        "options": [
          "cheap",
          "cloudy",
          "friendly"
        ],
        "readonly": false
      },
      {
        "correct": "grow",
        "options": [
          "melt",
          "freeze",
          "grow"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 16,
    "sender": "Hey Lewis,",
    "template": [
      "On Sundays, my family usually ",
      " for a big lunch.\nMy grandparents like to tell ",
      " about their childhood.\nMy little sister often ",
      " pictures of animals.\nWe usually spend the holidays with our ",
      ".\nMy parents always ",
      " my decisions.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "gathers",
        "options": [
          "travels",
          "gathers",
          "argues"
        ],
        "readonly": true
      },
      {
        "correct": "stories",
        "options": [
          "lies",
          "stories",
          "jokes"
        ],
        "readonly": false
      },
      {
        "correct": "draws",
        "options": [
          "cooks",
          "draws",
          "drives"
        ],
        "readonly": false
      },
      {
        "correct": "relatives",
        "options": [
          "strangers",
          "relatives",
          "colleagues"
        ],
        "readonly": false
      },
      {
        "correct": "support",
        "options": [
          "forget",
          "ignore",
          "support"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 17,
    "sender": "Hey Lewis,",
    "template": [
      "Our school starts every day at ",
      " o'clock.\nStudents usually wear a ",
      " to school.\nMy teacher always ",
      " the lesson clearly.\nWe usually have ",
      " at the end of each term.\nDuring break time, students often ",
      " with their friends.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "seven",
        "options": [
          "seven",
          "midnight",
          "noon"
        ],
        "readonly": true
      },
      {
        "correct": "uniform",
        "options": [
          "uniform",
          "costume",
          "helmet"
        ],
        "readonly": false
      },
      {
        "correct": "explains",
        "options": [
          "ignores",
          "hides",
          "explains"
        ],
        "readonly": false
      },
      {
        "correct": "exams",
        "options": [
          "exams",
          "parties",
          "holidays"
        ],
        "readonly": false
      },
      {
        "correct": "chat",
        "options": [
          "chat",
          "cook",
          "sleep"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 18,
    "sender": "Hey Lewis,",
    "template": [
      "My mother usually ",
      " dinner for the whole family.\nWe often add a little ",
      " to the soup.\nThis bakery sells fresh ",
      " every morning.\nI usually drink a glass of ",
      " before bed.\nMy favorite dish is quite ",
      ".\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "cooks",
        "options": [
          "paints",
          "cooks",
          "drives"
        ],
        "readonly": true
      },
      {
        "correct": "salt",
        "options": [
          "glue",
          "sand",
          "salt"
        ],
        "readonly": false
      },
      {
        "correct": "bread",
        "options": [
          "shoes",
          "bread",
          "toys"
        ],
        "readonly": false
      },
      {
        "correct": "milk",
        "options": [
          "milk",
          "paint",
          "oil"
        ],
        "readonly": false
      },
      {
        "correct": "spicy",
        "options": [
          "heavy",
          "loud",
          "spicy"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 19,
    "sender": "Hey Lewis,",
    "template": [
      "Our dog usually ",
      " when someone knocks on the door.\nMy cat likes to sleep on the ",
      " all afternoon.\nWe feed our fish ",
      " a day.\nRabbits usually eat ",
      " and other vegetables.\nMy brother takes the dog for a ",
      " every evening.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "barks",
        "options": [
          "barks",
          "cooks",
          "sings"
        ],
        "readonly": true
      },
      {
        "correct": "sofa",
        "options": [
          "stove",
          "roof",
          "sofa"
        ],
        "readonly": false
      },
      {
        "correct": "twice",
        "options": [
          "never",
          "twice",
          "rarely"
        ],
        "readonly": false
      },
      {
        "correct": "carrots",
        "options": [
          "carrots",
          "meat",
          "bread"
        ],
        "readonly": false
      },
      {
        "correct": "walk",
        "options": [
          "swim",
          "walk",
          "ride"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 20,
    "sender": "Hey Lewis,",
    "template": [
      "My mother usually goes ",
      " on Saturday mornings.\nThis shop offers a big ",
      " every weekend.\nI usually pay by ",
      " instead of cash.\nThe market sells fresh ",
      " every day.\nWe usually make a shopping ",
      " before going to the store.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "shopping",
        "options": [
          "swimming",
          "shopping",
          "hiking"
        ],
        "readonly": true
      },
      {
        "correct": "discount",
        "options": [
          "delay",
          "punishment",
          "discount"
        ],
        "readonly": false
      },
      {
        "correct": "card",
        "options": [
          "foot",
          "hand",
          "card"
        ],
        "readonly": false
      },
      {
        "correct": "vegetables",
        "options": [
          "vegetables",
          "furniture",
          "electronics"
        ],
        "readonly": false
      },
      {
        "correct": "list",
        "options": [
          "speech",
          "song",
          "list"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 21,
    "sender": "Hey Lewis,",
    "template": [
      "My brother plays ",
      " every weekend.\nI usually go ",
      " in the park before work.\nOur gym offers yoga ",
      " every evening.\nSwimming helps keep my body ",
      ".\nWe usually train as a ",
      " twice a week.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "football",
        "options": [
          "piano",
          "chess",
          "football"
        ],
        "readonly": true
      },
      {
        "correct": "jogging",
        "options": [
          "sleeping",
          "shopping",
          "jogging"
        ],
        "readonly": false
      },
      {
        "correct": "classes",
        "options": [
          "meals",
          "classes",
          "uniforms"
        ],
        "readonly": false
      },
      {
        "correct": "fit",
        "options": [
          "tired",
          "fit",
          "heavy"
        ],
        "readonly": false
      },
      {
        "correct": "team",
        "options": [
          "crowd",
          "audience",
          "team"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 22,
    "sender": "Hey Lewis,",
    "template": [
      "I usually check my ",
      " first thing in the morning.\nThis app helps me ",
      " my daily schedule.\nMy phone battery usually ",
      " all day.\nWe often ",
      " our relatives abroad through video chat.\nThis laptop is quite ",
      " and easy to carry.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "email",
        "options": [
          "shoes",
          "email",
          "garden"
        ],
        "readonly": true
      },
      {
        "correct": "organize",
        "options": [
          "destroy",
          "organize",
          "ignore"
        ],
        "readonly": false
      },
      {
        "correct": "lasts",
        "options": [
          "grows",
          "lasts",
          "melts"
        ],
        "readonly": false
      },
      {
        "correct": "call",
        "options": [
          "cook",
          "paint",
          "call"
        ],
        "readonly": false
      },
      {
        "correct": "light",
        "options": [
          "heavy",
          "old",
          "light"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 23,
    "sender": "Hey Lewis,",
    "template": [
      "The bus usually ",
      " on time.\nI usually take the ",
      " to work every day.\nDuring rush hour, the roads are usually quite ",
      ".\nPassengers must buy a ",
      " before boarding.\nThe subway station is very close to my ",
      ".\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "arrives",
        "options": [
          "disappears",
          "explodes",
          "arrives"
        ],
        "readonly": true
      },
      {
        "correct": "train",
        "options": [
          "helicopter",
          "boat",
          "train"
        ],
        "readonly": false
      },
      {
        "correct": "crowded",
        "options": [
          "empty",
          "crowded",
          "quiet"
        ],
        "readonly": false
      },
      {
        "correct": "ticket",
        "options": [
          "ticket",
          "uniform",
          "gift"
        ],
        "readonly": false
      },
      {
        "correct": "house",
        "options": [
          "farm",
          "house",
          "forest"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 24,
    "sender": "Hey Lewis,",
    "template": [
      "Our neighborhood has a small ",
      " where children play.\nThe local bakery always smells ",
      " in the morning.\nOur neighbors are always very ",
      " to us.\nThere is a small ",
      " near my house.\nThe streets in our town are usually quite ",
      ".\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "park",
        "options": [
          "park",
          "factory",
          "airport"
        ],
        "readonly": true
      },
      {
        "correct": "delicious",
        "options": [
          "delicious",
          "strange",
          "terrible"
        ],
        "readonly": false
      },
      {
        "correct": "friendly",
        "options": [
          "noisy",
          "friendly",
          "rude"
        ],
        "readonly": false
      },
      {
        "correct": "library",
        "options": [
          "volcano",
          "library",
          "desert"
        ],
        "readonly": false
      },
      {
        "correct": "clean",
        "options": [
          "dirty",
          "flooded",
          "clean"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 25,
    "sender": "Hey Lewis,",
    "template": [
      "My colleagues and I usually have a ",
      " every Monday morning.\nI usually finish my ",
      " before lunchtime.\nMy boss is usually quite ",
      " about deadlines.\nThe office usually opens at ",
      " o'clock.\nWe usually take a short ",
      " in the middle of the day.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "meeting",
        "options": [
          "holiday",
          "meeting",
          "party"
        ],
        "readonly": true
      },
      {
        "correct": "report",
        "options": [
          "dinner",
          "report",
          "vacation"
        ],
        "readonly": false
      },
      {
        "correct": "strict",
        "options": [
          "strict",
          "lazy",
          "careless"
        ],
        "readonly": false
      },
      {
        "correct": "eight",
        "options": [
          "noon",
          "midnight",
          "eight"
        ],
        "readonly": false
      },
      {
        "correct": "break",
        "options": [
          "nap",
          "break",
          "trip"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 26,
    "sender": "Hey Lewis,",
    "template": [
      "I usually drink plenty of ",
      " every day.\nMy grandmother goes for a check-up ",
      ".\nEating too much sugar is not very ",
      ".\nI usually go to bed ",
      " on weekdays.\nWe always wash our hands before ",
      ".\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "water",
        "options": [
          "paint",
          "water",
          "oil"
        ],
        "readonly": true
      },
      {
        "correct": "regularly",
        "options": [
          "regularly",
          "rarely",
          "never"
        ],
        "readonly": false
      },
      {
        "correct": "healthy",
        "options": [
          "cheap",
          "healthy",
          "quiet"
        ],
        "readonly": false
      },
      {
        "correct": "early",
        "options": [
          "early",
          "late",
          "never"
        ],
        "readonly": false
      },
      {
        "correct": "eating",
        "options": [
          "eating",
          "sleeping",
          "singing"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 27,
    "sender": "Hey Lewis,",
    "template": [
      "My sister enjoys playing the ",
      " every afternoon.\nI usually read a ",
      " before going to sleep.\nMy father likes to collect old ",
      ".\nWe usually listen to ",
      " while doing housework.\nPainting helps me feel very ",
      ".\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "piano",
        "options": [
          "computer",
          "football",
          "piano"
        ],
        "readonly": true
      },
      {
        "correct": "novel",
        "options": [
          "recipe",
          "novel",
          "map"
        ],
        "readonly": false
      },
      {
        "correct": "stamps",
        "options": [
          "plates",
          "shoes",
          "stamps"
        ],
        "readonly": false
      },
      {
        "correct": "music",
        "options": [
          "music",
          "traffic",
          "silence"
        ],
        "readonly": false
      },
      {
        "correct": "relaxed",
        "options": [
          "tired",
          "relaxed",
          "nervous"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 28,
    "sender": "Hey Lewis,",
    "template": [
      "We usually go ",
      " in the mountains on weekends.\nMy family likes to have a ",
      " in the park.\nOn Saturdays, I usually clean my ",
      ".\nWe usually watch a ",
      " together on Friday night.\nMy friends and I like to meet at the ",
      " on weekends.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "hiking",
        "options": [
          "sleeping",
          "hiking",
          "working"
        ],
        "readonly": true
      },
      {
        "correct": "picnic",
        "options": [
          "exam",
          "picnic",
          "meeting"
        ],
        "readonly": false
      },
      {
        "correct": "room",
        "options": [
          "office",
          "room",
          "garden"
        ],
        "readonly": false
      },
      {
        "correct": "movie",
        "options": [
          "meeting",
          "movie",
          "lecture"
        ],
        "readonly": false
      },
      {
        "correct": "cafe",
        "options": [
          "cafe",
          "office",
          "hospital"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 29,
    "sender": "Hey Lewis,",
    "template": [
      "Birds usually sing early in the ",
      ".\nThe forest near our town is very ",
      ".\nWe usually go camping near the ",
      " in summer.\nBees usually fly around the colorful ",
      " in the garden.\nThe mountain air always feels quite ",
      ".\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "morning",
        "options": [
          "storm",
          "morning",
          "night"
        ],
        "readonly": true
      },
      {
        "correct": "peaceful",
        "options": [
          "peaceful",
          "loud",
          "crowded"
        ],
        "readonly": false
      },
      {
        "correct": "lake",
        "options": [
          "airport",
          "mall",
          "lake"
        ],
        "readonly": false
      },
      {
        "correct": "flowers",
        "options": [
          "books",
          "cars",
          "flowers"
        ],
        "readonly": false
      },
      {
        "correct": "fresh",
        "options": [
          "fresh",
          "heavy",
          "dirty"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 30,
    "sender": "Hey Lewis,",
    "template": [
      "I usually ",
      " the living room every weekend.\nMy brother always takes out the ",
      " every evening.\nWe usually do the ",
      " on Sunday mornings.\nMy mother likes to keep the kitchen very ",
      ".\nI usually water the ",
      " every morning.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "vacuum",
        "options": [
          "cook",
          "vacuum",
          "paint"
        ],
        "readonly": true
      },
      {
        "correct": "trash",
        "options": [
          "trash",
          "furniture",
          "carpet"
        ],
        "readonly": false
      },
      {
        "correct": "laundry",
        "options": [
          "laundry",
          "shopping",
          "homework"
        ],
        "readonly": false
      },
      {
        "correct": "tidy",
        "options": [
          "messy",
          "dark",
          "tidy"
        ],
        "readonly": false
      },
      {
        "correct": "plants",
        "options": [
          "windows",
          "plants",
          "furniture"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 31,
    "sender": "Hey Lewis,",
    "template": [
      "My family usually travels ",
      " once a year.\nBefore any trip, I always check the ",
      " forecast.\nWe usually pack our ",
      " the night before a trip.\nMy father prefers to book flights ",
      ".\nTravelling by train is usually quite ",
      ".\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "abroad",
        "options": [
          "backwards",
          "underground",
          "abroad"
        ],
        "readonly": true
      },
      {
        "correct": "weather",
        "options": [
          "weather",
          "homework",
          "furniture"
        ],
        "readonly": false
      },
      {
        "correct": "suitcase",
        "options": [
          "suitcase",
          "kitchen",
          "garden"
        ],
        "readonly": false
      },
      {
        "correct": "online",
        "options": [
          "underground",
          "loudly",
          "online"
        ],
        "readonly": false
      },
      {
        "correct": "relaxing",
        "options": [
          "expensive",
          "relaxing",
          "dangerous"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 32,
    "sender": "Hey Lewis,",
    "template": [
      "My cousin plays the ",
      " in a local band.\nThis museum usually displays modern ",
      ".\nI usually sing in the school ",
      " on Fridays.\nClassical music always makes me feel quite ",
      ".\nMy sister takes dance ",
      " every Tuesday.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "guitar",
        "options": [
          "chess",
          "football",
          "guitar"
        ],
        "readonly": true
      },
      {
        "correct": "paintings",
        "options": [
          "vegetables",
          "paintings",
          "furniture"
        ],
        "readonly": false
      },
      {
        "correct": "choir",
        "options": [
          "choir",
          "garden",
          "kitchen"
        ],
        "readonly": false
      },
      {
        "correct": "calm",
        "options": [
          "angry",
          "calm",
          "hungry"
        ],
        "readonly": false
      },
      {
        "correct": "lessons",
        "options": [
          "lessons",
          "medicine",
          "exams"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 33,
    "sender": "Hey Lewis,",
    "template": [
      "My grandmother usually bakes ",
      " every weekend.\nThis recipe needs a pinch of ",
      ".\nWe usually preheat the ",
      " before baking a cake.\nI always add fresh ",
      " to my salads.\nThis cake usually takes an hour to ",
      ".\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "bread",
        "options": [
          "bread",
          "shoes",
          "furniture"
        ],
        "readonly": true
      },
      {
        "correct": "salt",
        "options": [
          "paint",
          "salt",
          "sand"
        ],
        "readonly": false
      },
      {
        "correct": "oven",
        "options": [
          "fridge",
          "garden",
          "oven"
        ],
        "readonly": false
      },
      {
        "correct": "herbs",
        "options": [
          "rocks",
          "paper",
          "herbs"
        ],
        "readonly": false
      },
      {
        "correct": "bake",
        "options": [
          "bake",
          "melt",
          "freeze"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 34,
    "sender": "Hey Lewis,",
    "template": [
      "My mother grows several ",
      " in our backyard.\nThese flowers need plenty of ",
      " to grow well.\nI usually water the garden every ",
      ".\nOur garden always looks quite ",
      " in spring.\nMy father likes to cut the ",
      " every month.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "vegetables",
        "options": [
          "rocks",
          "animals",
          "vegetables"
        ],
        "readonly": true
      },
      {
        "correct": "sunlight",
        "options": [
          "snow",
          "sunlight",
          "shade"
        ],
        "readonly": false
      },
      {
        "correct": "morning",
        "options": [
          "winter",
          "morning",
          "midnight"
        ],
        "readonly": false
      },
      {
        "correct": "colorful",
        "options": [
          "dusty",
          "colorful",
          "empty"
        ],
        "readonly": false
      },
      {
        "correct": "grass",
        "options": [
          "grass",
          "carpets",
          "windows"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 35,
    "sender": "Hey Lewis,",
    "template": [
      "I usually study at the ",
      " after school.\nMy classmates and I often ",
      " our lessons together.\nThis library usually stays open until ",
      " in the evening.\nI always take careful ",
      " during lectures.\nGroup study usually helps me stay ",
      ".\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "library",
        "options": [
          "stadium",
          "library",
          "cinema"
        ],
        "readonly": true
      },
      {
        "correct": "review",
        "options": [
          "review",
          "skip",
          "forget"
        ],
        "readonly": false
      },
      {
        "correct": "nine",
        "options": [
          "nine",
          "noon",
          "dawn"
        ],
        "readonly": false
      },
      {
        "correct": "notes",
        "options": [
          "naps",
          "notes",
          "photos"
        ],
        "readonly": false
      },
      {
        "correct": "focused",
        "options": [
          "tired",
          "bored",
          "focused"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 36,
    "sender": "Hey Lewis,",
    "template": [
      "My friends and I usually meet at the ",
      " after class.\nI always ",
      " my friends when they need help.\nWe usually chat about our ",
      " for the weekend.\nMy best friend always tells the truth and never ",
      ".\nWe usually celebrate birthdays with a small ",
      ".\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "cafe",
        "options": [
          "cafe",
          "airport",
          "hospital"
        ],
        "readonly": true
      },
      {
        "correct": "support",
        "options": [
          "ignore",
          "support",
          "avoid"
        ],
        "readonly": false
      },
      {
        "correct": "plans",
        "options": [
          "enemies",
          "plans",
          "chores"
        ],
        "readonly": false
      },
      {
        "correct": "lies",
        "options": [
          "lies",
          "helps",
          "smiles"
        ],
        "readonly": false
      },
      {
        "correct": "party",
        "options": [
          "party",
          "meeting",
          "exam"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 37,
    "sender": "Hey Lewis,",
    "template": [
      "This restaurant usually serves the best ",
      " in town.\nWe usually book a ",
      " in advance on weekends.\nThe waiter always brings the ",
      " first.\nThis cafe usually plays soft ",
      " in the background.\nI always leave a small ",
      " for good service.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "seafood",
        "options": [
          "furniture",
          "clothes",
          "seafood"
        ],
        "readonly": true
      },
      {
        "correct": "table",
        "options": [
          "ticket",
          "flight",
          "table"
        ],
        "readonly": false
      },
      {
        "correct": "menu",
        "options": [
          "bill",
          "menu",
          "receipt"
        ],
        "readonly": false
      },
      {
        "correct": "music",
        "options": [
          "thunder",
          "music",
          "traffic"
        ],
        "readonly": false
      },
      {
        "correct": "tip",
        "options": [
          "tip",
          "gift",
          "note"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 38,
    "sender": "Hey Lewis,",
    "template": [
      "I usually save some ",
      " every month.\nMy parents always compare ",
      " before buying anything expensive.\nThis store usually offers free ",
      " for large orders.\nI always keep my ",
      " just in case I need a refund.\nWe usually pay our bills ",
      ".\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "money",
        "options": [
          "clothes",
          "food",
          "money"
        ],
        "readonly": true
      },
      {
        "correct": "prices",
        "options": [
          "colors",
          "shapes",
          "prices"
        ],
        "readonly": false
      },
      {
        "correct": "delivery",
        "options": [
          "delivery",
          "punishment",
          "noise"
        ],
        "readonly": false
      },
      {
        "correct": "receipts",
        "options": [
          "receipts",
          "shoes",
          "keys"
        ],
        "readonly": false
      },
      {
        "correct": "online",
        "options": [
          "loudly",
          "online",
          "underground"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 39,
    "sender": "Hey Lewis,",
    "template": [
      "We always ",
      " paper and plastic at home.\nOur town usually collects the ",
      " every Tuesday.\nTurning off the lights helps save ",
      ".\nMany people now prefer cloth ",
      " instead of plastic ones.\nPlanting more trees helps keep the air ",
      ".\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "recycle",
        "options": [
          "waste",
          "burn",
          "recycle"
        ],
        "readonly": true
      },
      {
        "correct": "trash",
        "options": [
          "vehicles",
          "trash",
          "furniture"
        ],
        "readonly": false
      },
      {
        "correct": "energy",
        "options": [
          "energy",
          "paper",
          "noise"
        ],
        "readonly": false
      },
      {
        "correct": "bags",
        "options": [
          "phones",
          "bags",
          "cars"
        ],
        "readonly": false
      },
      {
        "correct": "clean",
        "options": [
          "dirty",
          "heavy",
          "clean"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 40,
    "sender": "Hey Lewis,",
    "template": [
      "I usually go to ",
      " around ten o'clock.\nMy brother always takes a short ",
      " after lunch.\nA quiet room usually helps me sleep quite ",
      ".\nI always read a little before ",
      ".\nToo much coffee usually keeps me ",
      " at night.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "sleep",
        "options": [
          "school",
          "work",
          "sleep"
        ],
        "readonly": true
      },
      {
        "correct": "nap",
        "options": [
          "walk",
          "nap",
          "shower"
        ],
        "readonly": false
      },
      {
        "correct": "well",
        "options": [
          "loudly",
          "well",
          "badly"
        ],
        "readonly": false
      },
      {
        "correct": "bedtime",
        "options": [
          "lunchtime",
          "breakfast",
          "bedtime"
        ],
        "readonly": false
      },
      {
        "correct": "awake",
        "options": [
          "calm",
          "awake",
          "asleep"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 41,
    "sender": "Hey Lewis,",
    "template": [
      "I usually call my parents ",
      " to check on them.\nWe often send each other funny ",
      " during the day.\nMy grandmother prefers to talk on the ",
      " rather than text.\nI always reply to important ",
      " right away.\nWe usually keep our conversations quite ",
      " during work hours.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "daily",
        "options": [
          "daily",
          "hourly",
          "yearly"
        ],
        "readonly": true
      },
      {
        "correct": "messages",
        "options": [
          "bills",
          "messages",
          "reports"
        ],
        "readonly": false
      },
      {
        "correct": "phone",
        "options": [
          "bridge",
          "roof",
          "phone"
        ],
        "readonly": false
      },
      {
        "correct": "emails",
        "options": [
          "movies",
          "emails",
          "songs"
        ],
        "readonly": false
      },
      {
        "correct": "short",
        "options": [
          "short",
          "silent",
          "endless"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 42,
    "sender": "Hey Lewis,",
    "template": [
      "She always adds a little ",
      " to season the soup.\nThe bakery down the street sells fresh ",
      " every morning.\nI usually ",
      " the eggs for about ten minutes.\nThis recipe needs two cups of ",
      " and one egg.\nThe soup tastes a bit too ",
      " for my liking.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "salt",
        "options": [
          "salt",
          "sugar",
          "oil"
        ],
        "readonly": true
      },
      {
        "correct": "bread",
        "options": [
          "bread",
          "shoes",
          "paper"
        ],
        "readonly": false
      },
      {
        "correct": "boil",
        "options": [
          "boil",
          "paint",
          "drive"
        ],
        "readonly": false
      },
      {
        "correct": "flour",
        "options": [
          "flour",
          "stone",
          "paper"
        ],
        "readonly": false
      },
      {
        "correct": "salty",
        "options": [
          "salty",
          "loud",
          "heavy"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 43,
    "sender": "Hey Lewis,",
    "template": [
      "It looks like it might ",
      " later this afternoon.\nRemember to bring an ",
      " if you go outside.\nThe weather has been really ",
      " these past few days.\nA cold ",
      " blew through the town last night.\nWe canceled the picnic because of the sudden ",
      ".\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "rain",
        "options": [
          "rain",
          "sing",
          "cook"
        ],
        "readonly": true
      },
      {
        "correct": "umbrella",
        "options": [
          "umbrella",
          "oven",
          "pillow"
        ],
        "readonly": false
      },
      {
        "correct": "humid",
        "options": [
          "humid",
          "quiet",
          "cheap"
        ],
        "readonly": false
      },
      {
        "correct": "wind",
        "options": [
          "wind",
          "song",
          "bill"
        ],
        "readonly": false
      },
      {
        "correct": "storm",
        "options": [
          "storm",
          "concert",
          "exam"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 44,
    "sender": "Hey Lewis,",
    "template": [
      "I need to ",
      " these shoes because they don't fit.\nThe store is offering a big ",
      " this weekend.\nCould you check if this jacket comes in a smaller ",
      "?\nI paid in ",
      " instead of using my card.\nThe cashier gave me the wrong ",
      " by mistake.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "return",
        "options": [
          "return",
          "cook",
          "sleep"
        ],
        "readonly": true
      },
      {
        "correct": "discount",
        "options": [
          "discount",
          "lecture",
          "recipe"
        ],
        "readonly": false
      },
      {
        "correct": "size",
        "options": [
          "size",
          "flavor",
          "weight"
        ],
        "readonly": false
      },
      {
        "correct": "cash",
        "options": [
          "cash",
          "paint",
          "sand"
        ],
        "readonly": false
      },
      {
        "correct": "receipt",
        "options": [
          "receipt",
          "umbrella",
          "engine"
        ],
        "readonly": false
      }
    ]
  },
  {
    "id": 45,
    "sender": "Hey Lewis,",
    "template": [
      "I try to ",
      " at least three times a week.\nDrinking enough ",
      " keeps you healthy.\nMy doctor advised me to get more ",
      " after the surgery.\nJogging every morning makes me feel more ",
      ".\nHe pulled a muscle while ",
      " before the race.\nLove,\nHelen"
    ],
    "gaps": [
      {
        "correct": "exercise",
        "options": [
          "exercise",
          "argue",
          "paint"
        ],
        "readonly": true
      },
      {
        "correct": "water",
        "options": [
          "water",
          "oil",
          "ink"
        ],
        "readonly": false
      },
      {
        "correct": "rest",
        "options": [
          "rest",
          "noise",
          "debt"
        ],
        "readonly": false
      },
      {
        "correct": "energetic",
        "options": [
          "energetic",
          "forgetful",
          "nervous"
        ],
        "readonly": false
      },
      {
        "correct": "stretching",
        "options": [
          "stretching",
          "cooking",
          "reading"
        ],
        "readonly": false
      }
    ]
  }
],
  part2_3: [
  {
    "id": 1,
    "topic": "Films",
    "correctOrder": [
      "Old movies were very different from today's movies.",
      "That's because the movies were only in black and white, and sometimes without sound.",
      "Not only did these technological limitations exist, the movies were also low budget.",
      "Due to the lack of money, actors also had few opportunities to earn money through acting.",
      "Now things have changed, actors and filmmakers can earn thousands of dollars from film production."
    ]
  },
  {
    "id": 2,
    "topic": "Weekend activities",
    "correctOrder": [
      "It was held on Saturday morning, there was a 10 km race for adults.",
      "There were 60 participants, in which Ms. Kamus kept the fastest speed and won.",
      "After she received the prize, the following time was for children's activities.",
      "Activities including football, swimming, skipping rope, and the children played together very happily.",
      "After playing, the children were very hungry and ate with their parents."
    ]
  },
  {
    "id": 3,
    "topic": "The famous singer",
    "correctOrder": [
      "He is a famous singer who is loved by many fans.",
      "At the age of fifteen, he studied music at a special school.",
      "Before becoming famous, he had to practice very hard every day.",
      "With his unique style and clothes, he soon attracted attention.",
      "Thanks to his talent and personality, he became well-known to a large audience."
    ]
  },
  {
    "id": 4,
    "topic": "Family sports day",
    "correctOrder": [
      "It took place on Sunday morning in the park, there was a race for adults.",
      "Sixty people took part, and among them, Ms Kamus kept the fastest pace and won the race.",
      "After she got her prize, the next part was for children's activities.",
      "The activities were football, swimming, skipping, and more, and the kids had fun playing together.",
      "After the games, the kids were really hungry and ate with their parents."
    ]
  },
  {
    "id": 5,
    "topic": "Writing about a place",
    "correctOrder": [
      "Before writing about a place, you need to do some research on it.",
      "It is important to learn about the people and the history there carefully.",
      "Even if you can not visit the place, your writing will still look similar to real experiences.",
      "You should also compare that place with your own country.",
      "Such comparisons will make your writing more interesting and meaningful."
    ]
  },
  {
    "id": 6,
    "topic": "Movies then and now",
    "correctOrder": [
      "Movies today are very different from movies in the past",
      "In the old days, films were only in black and white, and sometimes even without sound.",
      "In addition to these technological limits, producers had very low budgets.",
      "Because of the lack of money, actors also earn little money from acting.",
      "Nowadays, everything has changed: actors and producers can earn a lot of money from producing films."
    ]
  },
  {
    "id": 7,
    "topic": "The history of transportation",
    "correctOrder": [
      "In the past, transportation was primarily accessible to the wealthy.",
      "Later, air travel became popular among business professionals.",
      "Eventually, buses and trains were introduced as affordable alternatives.",
      "These made traveling more accessible to everyone.",
      "Today, buses and trains are among the most common transportation options."
    ]
  },
  {
    "id": 8,
    "topic": "New coffee shop",
    "correctOrder": [
      "I arrived at the shop early in the morning, but it was crowded with people.",
      "A waiter assisted me in finding a table and handed me the menu.",
      "The menu was not as good as expected and quite pricey, so I decided to order a sandwich.",
      "The sandwich was both delicious and beautifully presented.",
      "I might return to try different types of drinks next time."
    ]
  },
  {
    "id": 9,
    "topic": "Artificial intelligence",
    "correctOrder": [
      "Over the past decade, artificial intelligence has revolutionized various industries.",
      "The early AI systems were limited to simple pattern recognition tasks.",
      "High computational costs previously hindered the development of AI.",
      "Nowadays, AI engineers build advanced models for complex tasks such as language translation.",
      "Modern AI tools help businesses to analyze data and make better decisions."
    ]
  },
  {
    "id": 10,
    "topic": "Company wellness day",
    "correctOrder": [
      "This month, the wellness day took place on Friday, focusing on work-life balance.",
      "More than 50 (con số bất kỳ) employees participated, with Mr.A (tên người) leading a workshop on stress relief.",
      "Activities included team yoga, time management seminars, and a group walk.",
      "After the workshops, awards were given for the most creative wellness ideas.",
      "Employees enjoyed healthy snacks and exchanged tips for managing stress."
    ]
  },
  {
    "id": 11,
    "topic": "Workplace evolution",
    "correctOrder": [
      "In the past, employees followed strict nine-to-five schedules.",
      "Limited technology once restricted remote work possibilities.",
      "Modern workplaces are adopting more flexible work models.",
      "Managers now use software to track project progress remotely.",
      "Today, companies experiment with shorter workweeks to boost productivity."
    ]
  },
  {
    "id": 12,
    "topic": "Music show at the park (Music festivals)",
    "correctOrder": [
      "The event was fully planned, financed, and supported by local authorities.",
      "As a result, entry was free, and around five thousand people attended.",
      "Many attendees arrived early and browsed local shops before the event began.",
      "Despite the busy day, workers finished ahead of schedule and watched the famous singer perform.",
      "The two-hour performance thrilled the audience, leaving everyone in high spirits."
    ]
  },
  {
    "id": 13,
    "topic": "Mae - The Math Girl",
    "correctOrder": [
      "Mae’s father worked as a nurse, and her mother was a teacher.",
      "Her parents motivated Mae to pursue higher education and focus on scientific studies.",
      "Mae worked diligently and achieved several remarkable milestones.",
      "She later joined a team, contributing her skills and knowledge.",
      "Eventually, she had the opportunity to undergo a training program in the United States."
    ]
  },
  {
    "id": 14,
    "topic": "IoT - Internet of Things",
    "correctOrder": [
      "The Internet of Things (IoT) links everyday devices to improve their capabilities.",
      "Early IoT devices faced limitations due to slow internet speeds and compatibility challenges.",
      "High development costs previously slowed the widespread adoption of IoT technology.",
      "Nowadays, engineers create smart devices for both residential and industrial applications.",
      "Modern IoT systems provide real-time data tracking and automation features."
    ]
  },
  {
    "id": 15,
    "topic": "Eating at restaurant",
    "correctOrder": [
      "I decided to try a new café located at the end of the street.",
      "The place was quite busy, with a lively atmosphere.",
      "Even so, a staff member quickly noticed me and brought over the menu.",
      "I was a bit surprised to see that there were only a few items to choose from.",
      "In the end, I went for the most expensive salad on the menu."
    ]
  },
  {
    "id": 16,
    "topic": "A group presentation",
    "correctOrder": [
      "First, we prepared the materials for our group presentation.",
      "Then, we presented our topic for 10 minutes.",
      "Throughout the presentation, we used images to explain our ideas.",
      "After the presentation, other students asked questions.",
      "Finally, each group member took turns answering the questions."
    ]
  },
  {
    "id": 17,
    "topic": "Workplace evolution (phiên bản 2)",
    "correctOrder": [
      "In the past, most workers followed fixed schedules from nine to five.",
      "Because technology was limited, working from home was almost impossible.",
      "Modern offices are now moving toward more flexible ways of working.",
      "Managers now use digital tools to follow project progress remotely.",
      "Many companies today are trying shorter workweeks to increase efficiency."
    ]
  },
  {
    "id": 18,
    "topic": "The first american woman in space",
    "correctOrder": [
      "Encouraged by her parents, she decided to study science at university.",
      "Her strong academic record earned her a place in a training program in the United States.",
      "Her passion for space led Mae to join a dedicated research team.",
      "As a member of the team, she traveled into space and carried out numerous experiments.",
      "Some of these experiments involved growing plants and observing animals aboard the spacecraft."
    ]
  },
  {
    "id": 19,
    "topic": "Social Media",
    "correctOrder": [
      "In the past, slow internet speeds made streaming or uploading videos difficult.",
      "Early platforms offered only basic features like text posts and simple images.",
      "Over time, social media platforms have greatly evolved in both design and functionality.",
      "Today’s platforms use complex algorithms to personalize and shape each user’s feed.",
      "Many influencers now earn income primarily through brand sponsorships and online ads."
    ]
  },
  {
    "id": 20,
    "topic": "University open day",
    "correctOrder": [
      "Before the open day, please contact us by phone or email so we can record your personal details.",
      "Using this information, we’ll prepare an identification card for you to collect upon arrival.",
      "You’ll need to show this card to enter the introductory talk and morning lectures.",
      "Every visitor will have the chance to join a Q\\&A session with current students.",
      "After the presentations, you’ll be able to explore different departments across the campus."
    ]
  },
  {
    "id": 21,
    "topic": "AI - Artificial Intelligence",
    "correctOrder": [
      "Over the past decade, artificial intelligence has reshaped industries around the world.",
      "Early AI systems were capable of handling only simple pattern recognition tasks.",
      "In the past, high computational costs slowed down the progress of AI development.",
      "Today, AI engineers design sophisticated models for applications such as language translation.",
      "Modern AI tools enable businesses to analyze vast amounts of data and make smarter decisions."
    ]
  },
  {
    "id": 22,
    "topic": "Healthy Eating",
    "correctOrder": [
      "In the past, many meals were high in sugar and unhealthy fats.",
      "Years ago, limited access to fresh produce made healthy eating more difficult.",
      "Modern diets now focus on fresh, whole foods instead of processed ones.",
      "Nutritionists today teach people how to plan balanced and nutritious meals.",
      "Nowadays, mobile apps help users track calories and discover healthy recipes."
    ]
  },
  {
    "id": 23,
    "topic": "Wellness Fair",
    "correctOrder": [
      "The wellness fair took place on Saturday afternoon, encouraging people to adopt healthier lifestyles.",
      "More than 60 (con số bất kỳ) participants joined the event, with Dr. A (tên người) leading an engaging fitness workshop.",
      "The fair also included activities like cooking demonstrations, mindfulness sessions, and a fun run.",
      "After the workshops, prizes were awarded to participants who created the most creative health posters.",
      "Families enjoyed tasting healthy snacks and discovering practical tips for better overall wellness."
    ]
  },
  {
    "id": 24,
    "topic": "The famous singer (phiên bản 2)",
    "correctOrder": [
      "He is a famous singer.",
      "Before becoming famous, he studied music at school when he was 15.",
      "His unique way of dressing and performing made him stand out from others.",
      "This helped him receive many invitations for collaborations and performances.",
      "He eventually became famous among audiences around the world."
    ]
  },
  {
    "id": 25,
    "topic": "The famous singer (phiên bản 3)",
    "correctOrder": [
      "He is a famous singer who is loved by many people.",
      "Before becoming famous, he studied music at school when he was 15 years old.",
      "He spent years practicing and improving his performance skills.",
      "His unique clothing style and stage presence made him stand out.",
      "Because of this, more and more people began to recognize and admire him."
    ]
  },
  {
    "id": 26,
    "topic": "Writing about a place (phiên bản 2)",
    "correctOrder": [
      "Before writing, it is important to research the place thoroughly.",
      "To prepare well, you should learn about the people and the history of the area.",
      "Sometimes you may not be able to visit the place, but you can still find similar information from other sources.",
      "Comparing that place with your own country can be very helpful.",
      "This comparison will help you gain a deeper understanding and write more effectively."
    ]
  },
  {
    "id": 27,
    "topic": "Busy coffee shop",
    "correctOrder": [
      "The café was very crowded when the customer arrived.",
      "The staff helped them find a table and handed them a menu.",
      "The customer was surprised because the menu was different from what they had expected.",
      "They decided to order the most expensive item — a sandwich.",
      "The customer said the sandwich was delicious and that they would definitely come back again."
    ]
  },
  {
    "id": 28,
    "topic": "My visit to a new coffee shop",
    "correctOrder": [
      "It was my first time visiting a new local coffee shop.",
      "At first, I didn’t think it would be good, but I decided to give it a try.",
      "I looked at the menu and saw many different kinds of food and drinks.",
      "I chose one dish to try for myself.",
      "When I tasted it, I found it really delicious and knew I would come back again."
    ]
  },
  {
    "id": 29,
    "topic": "Work",
    "correctOrder": [
      "The company offers flexible working hours to better support employees’ schedules.",
      "Her white desk stands out in the shared open office.",
      "She uses a planner to organize her tasks throughout the shorter workweek.",
      "At lunchtime, she enjoys a homemade sandwich prepared with fresh ingredients.",
      "In the evenings, they unwind by reading books on productivity and well-being."
    ]
  },
  {
    "id": 30,
    "topic": "Cultural festival",
    "correctOrder": [
      "The cultural fair was held on Sunday, celebrating and showcasing local traditions.",
      "About 60 (con số bất kỳ) participants took part, with Ms.A (tên người) leading a traditional dance group.",
      "The event featured pottery workshops, folk music performances, and food tastings.",
      "Families enjoyed taking photos and sharing delicious local dishes together.",
      "At the end of the event, prizes were given to participants with the best costumes."
    ]
  },
  {
    "id": 31,
    "topic": "Public Transportations",
    "correctOrder": [
      "In the past, many cities had fewer bus routes because of budget limitations.",
      "Older buses often didn’t have air conditioning or comfortable seating.",
      "City buses today are much more efficient than those from ten years ago.",
      "Drivers and staff now receive better training to provide improved passenger service.",
      "Modern buses often use electric power, helping to reduce pollution in urban areas."
    ]
  },
  {
    "id": 32,
    "topic": "Tourism",
    "correctOrder": [
      "Modern tourism now provides far more choices than in the past.",
      "In earlier times, travelers mostly depended on guidebooks and paper maps.",
      "Back then, limited technology also meant that booking options were quite restricted.",
      "Today, online platforms allow people to plan thoroughly and book their trips with ease.",
      "Moreover, local guides now offer personalized tours that give visitors more authentic experiences."
    ]
  },
  {
    "id": 33,
    "topic": "New coffee shop (phiên bản 2)",
    "correctOrder": [
      "When I arrived, the place was very crowded, and the staff were extremely busy on the first day.",
      "Even though it was crowded, the staff still managed to find a table for me.",
      "They handed me the menu, and when I looked through it, I saw quite a variety of dishes.",
      "After checking them all, I decided to order the most expensive sandwich.",
      "It tasted really good with melted cheese on top, and I’ll definitely come back to this place again."
    ]
  },
  {
    "id": 34,
    "topic": "Healthy eating",
    "correctOrder": [
      "In the past, many meals were high in sugar and unhealthy fats.",
      "Years ago, limited access to fresh produce made healthy eating much more challenging.",
      "Modern diets now emphasize fresh, whole foods instead of processed ones.",
      "Nutritionists today teach people how to create balanced and nutritious meal plans.",
      "Nowadays, mobile apps help users track calories and discover healthy recipes to support better lifestyles."
    ]
  },
  {
    "id": 35,
    "topic": "Tech fair",
    "correctOrder": [
      "The tech fair took place on Saturday morning, showcasing a variety of exciting new gadgets.",
      "More than 60 (con số bất kỳ) exhibitors participated, with Mr. A (tên người) presenting an impressive robot demonstration.",
      "The event featured engaging activities such as VR gaming, coding workshops, and thrilling drone races.",
      "After the demonstrations, awards were given to the creators of the most innovative products.",
      "Visitors enjoyed complimentary coffee and snacks while exploring the interactive exhibits."
    ]
  },
  {
    "id": 36,
    "topic": "End of term project",
    "correctOrder": [
      "Your end-of-term project should focus on at least two of the given topics.",
      "It must include relevant pictures along with your own written text about the subject.",
      "You will then use these pictures and your written work to create a class presentation.",
      "During the presentation, you should summarize your main points, and it should last about five minutes.",
      "Afterward, your classmates will have the opportunity to ask questions, and you will respond to them."
    ]
  },
  {
    "id": 37,
    "topic": "College Welcoming Day",
    "correctOrder": [
      "Today will begin at 10 a.m. with a short presentation.",
      "At the end of the presentation, you will meet the heads of departments and lecturers.",
      "These staff members will take you on a tour of the school’s buildings and sports facilities in small groups.",
      "During this tour, you will need to stay with these students until lunchtime.",
      "This meal will be provided on the second floor of the engineering building."
    ]
  },
  {
    "id": 38,
    "topic": "The history of transportation (phiên bản 2)",
    "correctOrder": [
      "In the past, traveling was something only wealthy people could afford.",
      "The development of trains and cars made travel more convenient and affordable for the general public.",
      "Later on, airplanes also helped make traveling easier and more accessible.",
      "Because flying is very fast, it supports travel for both holidays and business purposes.",
      "Today, improvements in transportation make it easier to travel to many parts of the world."
    ]
  },
  {
    "id": 39,
    "topic": "The famous singer (phiên bản 4 - new)",
    "correctOrder": [
      "Before becoming famous at a young age, he studied art and music in high school.",
      "During this time, he started performing on stage.",
      "During his performances on stage, he liked wearing colorful clothes and painting his face.",
      "This unusual way of dressing and his songs attracted people’s attention.",
      "They then started following him on social media, and he is now very famous."
    ]
  }
],
  part4: [
  {
    "id": 1,
    "topic": "Games from childhood",
    "texts": {
      "A": "In the past, I really liked playing board games. Now, to limit the children from using computers, I often spend time playing with them. However, I have struggled with them because the games nowadays have more characters and rules, making us think a lot every time we play. Despite this, my children and I still like it and have a good time together.",
      "B": "When I was a child, I often played soccer with other children of the same age. We usually played in the schoolyard and sometimes in the open spaces of the neighborhood. We divided into small teams and chased the ball until we were all tired.",
      "C": "When I was a child, I didn't like going out to play, so I chose reading books as a form of entertainment. The stories described in the pages of books helped me discover my own world. Later, when I grew up, I started liking modern games with eye-catching interfaces, which help me relax and increase my creativity.",
      "D": "When I was a child, I really liked outdoor activities. I remember that on bad weather days, I was always by the window, glued to it, looking outside and praying for the rain to stop. At those times, my mother often gave me paper and a box of crayons. I really enjoyed that drawing activity and often drew at home when the weather was bad."
    },
    "statements": [
      {
        "statement": "Who finds today’s games harder than before?",
        "correct": "A"
      },
      {
        "statement": "Who enjoyed playing with friends in childhood?",
        "correct": "B"
      },
      {
        "statement": "Who enjoys playing with their children?",
        "correct": "A"
      },
      {
        "statement": "Who waited and hoped to go outside?",
        "correct": "D"
      },
      {
        "statement": "Who prefers modern games?",
        "correct": "C"
      },
      {
        "statement": "Who enjoyed arts as a child?",
        "correct": "D"
      },
      {
        "statement": "Who enjoyed reading books as a child?",
        "correct": "C"
      }
    ]
  },
  {
    "id": 2,
    "topic": "Extreme sports",
    "texts": {
      "A": "Before diving into any extreme sport, I truly believe it’s crucial to undergo proper training. While these activities can be thrilling, they also carry risks if you're not well-prepared. I've witnessed people injuring themselves simply because they didn't take the necessary precautions. That’s why I always make sure to complete a training program and familiarize myself with the safety guidelines before trying something new. With the right preparation, extreme sports can be an amazing experience.",
      "B": "I've always had a fondness for more traditional sports such as swimming, running, and tennis. They're enjoyable and easy to incorporate into a routine. However, a few months ago, I had the chance to go bungee jumping during a vacation, and it turned out to be an unforgettable experience. I didn’t anticipate having so much fun! While I still prefer regular sports for daily exercise, I now feel much more open to trying extreme sports occasionally for the thrill.",
      "C": "What I appreciate most about extreme sports is the unique way they allow me to connect with nature. Activities like rock climbing and mountain biking enable me to explore stunning landscapes while also pushing my physical and mental limits. It’s an escape from the everyday routine, and it makes me feel truly alive. If I had more time and resources, I would love to engage in these sports more frequently, particularly in wild, remote locations.",
      "D": "I understand that some people find extreme sports exhilarating, but they’ve never been significant to me. In fact, I try to avoid them whenever I can. I’m not fond of the idea of placing myself in risky situations just for the sake of excitement. There are many safer alternatives to staying active and enjoying life. I’d much rather take a peaceful walk or do some yoga than jump out of an airplane or scale a mountain. It’s simply not my cup of tea."
    },
    "statements": [
      {
        "statement": "Who finds extreme sport unimportant?",
        "correct": "D"
      },
      {
        "statement": "Who finds training before participating is important?",
        "correct": "A"
      },
      {
        "statement": "Who still likes extreme sports after playing once?",
        "correct": "B"
      },
      {
        "statement": "Who wants to play more extreme sport?",
        "correct": "C"
      },
      {
        "statement": "Who likes traditional sports like swimming?",
        "correct": "B"
      },
      {
        "statement": "Who enjoys nature?",
        "correct": "C"
      },
      {
        "statement": "Who always avoids playing extreme sport?",
        "correct": "D"
      }
    ]
  },
  {
    "id": 3,
    "topic": "Music festival",
    "texts": {
      "A": "I stayed until the very last moment of the festival and absolutely loved the grand finale. The stage lit up with dazzling lights and fireworks, creating an unforgettable atmosphere. Although getting there was a hassle due to heavy traffic and packed buses, once I arrived, all those inconveniences faded away. In the end, the final performance made every bit of the struggle worthwhile.",
      "B": "Normally, I steer clear of festivals, but I decided to give this one a try. Unfortunately, I didn’t have a great time. The sound quality was poor, the event schedule seemed chaotic, and to top it off, it started raining heavily. The muddy ground made things even worse, and I spent most of the day feeling uncomfortable. Honestly, I didn’t think it was worth the trouble. The only highlight for me was the beautiful park where the festival took place.",
      "C": "I really enjoyed the lively atmosphere created by the music. One of the bands on the opening night was so amazing that I couldn’t help but sing along. However, everything was quite expensive. The tickets were pricey, and the food and drinks were ridiculously overcharged. I ended up spending more than I had planned. Even though the performances were great, I do hope the organizers will bring the prices down next year.",
      "D": "For me, the most memorable part of the festival was its location. The park by the river was vast and picturesque, with plenty of spots to sit and unwind between performances. I enjoyed a nice lunch there, though it was a bit pricey. Some of the shows were enjoyable, but I didn’t stay for the entire event. Overall, it was the venue that left the biggest impression on me."
    },
    "statements": [
      {
        "statement": "Who experienced bad weather?",
        "correct": "B"
      },
      {
        "statement": "Who loved one of the performances?",
        "correct": "C"
      },
      {
        "statement": "Who thought it was too expensive?",
        "correct": "C"
      },
      {
        "statement": "Who found the traffic difficult?",
        "correct": "A"
      },
      {
        "statement": "Who liked the final performance of the show?",
        "correct": "A"
      },
      {
        "statement": "Who didn’t like the festival overall?",
        "correct": "B"
      },
      {
        "statement": "Who liked the location?",
        "correct": "D"
      }
    ]
  },
  {
    "id": 4,
    "topic": "Technology in childhood",
    "texts": {
      "A": "When I was young, I enjoyed playing simple computer games that my dad had programmed for me. Today, I teach my children to code using easy-to-use platforms like Scratch. These tools make learning programming enjoyable, though I spend time helping them grasp the logic behind it. Working together on coding fosters both creativity and teamwork.",
      "B": "As a child, I loved spending time with my friends, building and controlling toy robots. I’ll never forget the thrill of making them move. Those experiences sparked my passion for technology, and I still look back fondly on those moments of discovery.",
      "C": "When I was younger, I was fascinated by science magazines about robots and computers. The articles fueled my curiosity. Now, I develop mobile apps, creating tools for daily life. Thanks to modern software, the development process has become faster, but the excitement of innovation remains the same.",
      "D": "As a kid, I spent rainy days with my siblings watching TV shows about gadgets and inventions. We eagerly awaited each new episode. Today, I prefer taking online courses to stay up-to-date with AI and blockchain. They offer flexibility and are a great way to keep pace with the rapidly changing tech world."
    },
    "statements": [
      {
        "statement": "Who finds modern tools more accessible?",
        "correct": "A"
      },
      {
        "statement": "Who now enjoys app development?",
        "correct": "C"
      },
      {
        "statement": "Who loved playing with toy robots as a child?",
        "correct": "B"
      },
      {
        "statement": "Who loved watching tech shows as a child?",
        "correct": "D"
      },
      {
        "statement": "Who now prefers online learning?",
        "correct": "D"
      },
      {
        "statement": "Who enjoys coding with family?",
        "correct": "A"
      },
      {
        "statement": "Who loved science magazines as a child?",
        "correct": "C"
      }
    ]
  },
  {
    "id": 5,
    "topic": "Technology in childhood - Phiên bản 2",
    "texts": {
      "A": "When I was a child, I enjoyed building simple circuits with my parents using basic kits. Today, I collaborate on tech projects with my cousins using drag-and-drop coding platforms. These tools make the development process easier, but I always take the time to thoroughly test our creations. It’s a wonderful way to foster creativity and work together.",
      "B": "As a kid, I played with programmable toys like robotic pets alongside my friends. I can still recall the excitement of programming their movements. Those toys sparked my interest in logic and curiosity, and I continue to cherish those early experiences with technology.",
      "C": "Growing up, I was fascinated by books about inventors and their innovative creations. Those stories inspired my imagination. Today, I design prototypes using 3D modeling software. The tools are much more precise now, but the joy of creating something new still feels just like the excitement of those childhood books.",
      "D": "I spent many hours as a child exploring my family’s old computer, learning basic commands. Rainy days often meant staying indoors and experimenting with different software. Today, I keep up with the latest innovations by listening to tech podcasts. They’re not only entertaining but also help me stay connected to the ever-evolving tech world."
    },
    "statements": [
      {
        "statement": "Who now enjoys 3D modeling?",
        "correct": "C"
      },
      {
        "statement": "Who finds modern platforms user-friendly?",
        "correct": "A"
      },
      {
        "statement": "Who loved playing with programmable toys as a child?",
        "correct": "B"
      },
      {
        "statement": "Who loved exploring early computers as a child?",
        "correct": "D"
      },
      {
        "statement": "Who enjoys creating tech projects with family?",
        "correct": "A"
      },
      {
        "statement": "Who loved reading about inventions as a child?",
        "correct": "C"
      },
      {
        "statement": "Who now prefers tech podcasts?",
        "correct": "D"
      }
    ]
  },
  {
    "id": 6,
    "topic": "Work and life balance",
    "texts": {
      "A": "When I was a child, I enjoyed playing board games with my parents after their busy workdays. Now, I get to share that experience with my own kids, and having a four-day workweek gives us more time together. Flexible schedules are a big help, but I always make sure to plan ahead so I can balance both work and family life. These are the moments that create lasting memories.",
      "B": "As a kid, I would set up pretend offices with my friends, using toy phones and notebooks. I loved taking on the role of 'boss' and organizing our tasks. Those imaginative games taught me valuable lessons in organization and leadership, and I still laugh thinking about the 'serious' meetings we held.",
      "C": "When I was younger, I devoured books about different professions, dreaming about what my future career might be. Those books inspired my ambition. Today, I rely on productivity apps to keep track of my tasks in my four-day workweek. While the apps make my work more efficient, the excitement of organizing and planning is still the same.",
      "D": "As a child, I spent countless evenings playing tag with my friends in the neighborhood. On rainy days, though, I often found myself feeling bored indoors. Now, after work, I practice mindfulness to help me relax and recharge. It’s especially helpful with a shorter workweek, as it keeps me focused and refreshed."
    },
    "statements": [
      {
        "statement": "Who now enjoys productivity apps?",
        "correct": "C"
      },
      {
        "statement": "Who loved outdoor play as a child?",
        "correct": "D"
      },
      {
        "statement": "Who enjoys family time with board games?",
        "correct": "A"
      },
      {
        "statement": "Who loved organizing pretend offices as a child?",
        "correct": "B"
      },
      {
        "statement": "Who finds modern schedules more flexible?",
        "correct": "A"
      },
      {
        "statement": "Who loved reading about careers as a child?",
        "correct": "C"
      },
      {
        "statement": "Who now prefers mindfulness practices?",
        "correct": "D"
      }
    ]
  },
  {
    "id": 7,
    "topic": "Childhood memories",
    "texts": {
      "A": "When I was a child, I loved sitting by the fireplace listening to my grandfather’s folktales. His voice brought every character to life, and those evenings always felt magical—they taught me the power of imagination. Nowadays, I share that same joy with my nieces by reading interactive storybooks on tablets. The animations and sounds make the stories more vivid and exciting for them. Still, I always take care to choose content that’s suitable for their age. To me, blending old traditions with modern technology is a beautiful way to keep storytelling alive across generations.",
      "B": "When I was a young, I used to ride my bike around the village with my friends almost every afternoon. I can still recall the feeling of the wind brushing against my face, the excitement of racing each other, and the pure sense of freedom it brought. Those simple rides weren’t just fun—they taught me what independence and adventure felt like, lessons that stayed with me as I grew up. Nowadays, it’s a bit sad to see that many children spend more time indoors, glued to screens instead of exploring outside. Sometimes I find myself missing those carefree afternoons when happiness was as simple as pedaling down a dusty road. Thinking back, I realize those moments helped me develop a love for the outdoors and a lasting appreciation for friendship.",
      "C": "As a kid, I could spend hours drawing animals, trees, and landscapes with my box of crayons and pencils. I loved playing with bright colors and shapes, and I always felt proud showing my drawings to my family. What started as a simple childhood hobby slowly turned into a lifelong passion. Now, I’m a graphic designer, creating digital art for various clients. Modern design tools help me bring my ideas to life with more precision, yet the creative joy I feel is just like it was back then. For me, drawing has always been a way to express myself—and it still fills my days with happiness.",
      "D": "When I was growing up, I loved going on camping trips with my family in the countryside. We pitched our tents, cooked simple meals over a fire, and spent long nights gazing at the stars. Those moments made me feel deeply connected to nature and left me with unforgettable memories. Sometimes, though, rainy weather would ruin our plans, and I always felt a bit sad when we had to stay indoors. These days, my adventures have taken a different form — I enjoy visiting museums and exhibitions instead. Exploring history through artifacts and stories gives me a similar sense of curiosity and wonder, just in a quieter, more comfortable setting. To me, museums are a gentle way to travel through time and appreciate the beauty of the past."
    },
    "statements": [
      {
        "statement": "Who now enjoys graphic design?",
        "correct": "C"
      },
      {
        "statement": "Who loved camping as a child?",
        "correct": "D"
      },
      {
        "statement": "Who finds modern books more engaging?",
        "correct": "A"
      },
      {
        "statement": "Who loved drawing as a child?",
        "correct": "C"
      },
      {
        "statement": "Who now prefers museum visits?",
        "correct": "D"
      },
      {
        "statement": "Who enjoys storytelling with family?",
        "correct": "A"
      },
      {
        "statement": "Who loved bike riding as a child?",
        "correct": "B"
      }
    ]
  },
  {
    "id": 8,
    "topic": "Music festival (phiên bản 2)",
    "texts": {
      "A": "I went to the festival, but on the first day, I didn’t enjoy it much. It felt a bit dull and not very exciting. Still, the stage was bright with lights and fireworks, and the overall atmosphere was unforgettable. The music lifted my mood and made me feel truly happy. Interestingly, by the final day, everything seemed different—I began to enjoy it a lot more. In the end, I was really glad I decided to go.",
      "B": "I’ve been to this festival every year, and of course, I joined again this time. But honestly, I didn’t enjoy the music, and the weather made things worse. It kept raining, turning the ground muddy and uncomfortable for everyone. After this experience, I think I won’t go again next year.",
      "C": "I absolutely loved the energy of the music and enjoyed every part of the program from start to finish. Although it rained a little, it didn’t bother me at all. The only thing I didn’t like was the expensive ticket — I spent more than I had planned. Despite that, I still had a great time and hope the organizers consider lowering the price in the future.",
      "D": "I was one of the musicians performing on the first day of the festival, and I also met several familiar bands there. Even though I only played a few songs, I stayed until the event ended. The pay wasn’t great, but I really enjoyed myself because I got to reconnect with friends. However, I’m still thinking about the long travel distance since the venue was quite far from the city center."
    },
    "statements": [
      {
        "statement": "Who enjoyed the music throughout all the festival?",
        "correct": "C"
      },
      {
        "statement": "Who only liked the last day?",
        "correct": "A"
      },
      {
        "statement": "Who was disappointed with the weather?",
        "correct": "B"
      },
      {
        "statement": "Who met old friends again?",
        "correct": "D"
      },
      {
        "statement": "Who thought the location was not good?",
        "correct": "D"
      },
      {
        "statement": "Who didn’t like the festival overall?",
        "correct": "B"
      },
      {
        "statement": "Who thought it was expensive?",
        "correct": "C"
      }
    ]
  },
  {
    "id": 9,
    "topic": "Extreme sports (phiên bản 2)",
    "texts": {
      "A": "For me, the most important thing about extreme sports is being well-prepared. Many people think it’s all about excitement and courage, but I don’t see it that way. Without proper training, it’s easy to get hurt or even put others at risk. I once took a rock-climbing course and spent weeks learning how to use the equipment correctly. After that, the actual climb was much more enjoyable because I felt confident. I believe training not only keeps you safe but also makes the experience more relaxed and rewarding.",
      "B": "I’ve always preferred traditional sports like swimming and running because they help me stay healthy without being too risky. Still, I was curious about how extreme sports might feel, so I tried bungee jumping during a holiday last year. At first, I was really nervous, but once I jumped, the feeling was incredible. It was a kind of thrill I had never felt before. Even so, I still swim every week because it’s safer and more practical, though I admit extreme sports can be exciting to try at least once.",
      "C": "Honestly, I don’t really understand why people enjoy extreme sports. They seem dangerous and unnecessary to me. I’ve never tried one, and I don’t intend to. Some friends have invited me to go snowboarding or paragliding, but I always refuse. It’s not that I dislike sports—I actually enjoy cycling and tennis—but I just don’t see any reason to risk my health for a few seconds of excitement. In my opinion, extreme sports aren’t essential for happiness, so I stay away from them whenever I can.",
      "D": "What I love most about extreme sports is that they often take place in beautiful natural settings. Last summer, I went kayaking on a wild river, and the scenery was breathtaking. I also tried mountain biking through the forest and loved the feeling of fresh air and freedom. For me, it’s not just about the sport itself but also about being surrounded by mountains, trees, and rivers. I sometimes wish I had more time and money to do these activities more often. Extreme sports give me energy and make me feel close to nature."
    },
    "statements": [
      {
        "statement": "Who enjoys being outdoors when doing extreme sports?",
        "correct": "D"
      },
      {
        "statement": "Who believes extreme sports are not important?",
        "correct": "C"
      },
      {
        "statement": "Who once tried an extreme sport and enjoyed it?",
        "correct": "B"
      },
      {
        "statement": "Who wishes to do more extreme sports in the future?",
        "correct": "D"
      },
      {
        "statement": "Who thinks preparation is necessary before doing extreme sports?",
        "correct": "A"
      },
      {
        "statement": "Who always avoids extreme sports?",
        "correct": "C"
      },
      {
        "statement": "Who usually does ordinary sports?",
        "correct": "B"
      }
    ]
  },
  {
    "id": 10,
    "topic": "Free time activity",
    "texts": {
      "A": "When I was a teenager, I loved recording short stories on an old tape recorder with my cousins. We spent hours coming up with ideas and acting them out just for fun. These days, we make podcasts using modern apps that make editing and publishing much easier and more enjoyable. Even though technology has simplified the process, we still spend a lot of time planning each episode carefully. For me, podcasting is a creative way to express ideas and connect with people on a deeper level.",
      "B": "As a child, I spent many sunny afternoons flying kites in the park with my brothers and sisters. Watching my kite rise high into the sky always filled me with happiness and excitement. Those simple yet meaningful moments taught me patience and coordination. Even now, whenever I see children flying kites, I feel warm memories returning. Those carefree days will always be some of my favorite childhood moments.",
      "C": "When I was little, I was fascinated by doing jigsaw puzzles with my family. Carefully fitting each piece into place was both fun and satisfying. Now that I’m older, I often play strategy-based video games, which feel like a modern version of puzzles. They’re not only entertaining but also help me stay focused and think critically. For me, these games bring the same sense of challenge and accomplishment that puzzles once did — just in a more dynamic and interactive way.",
      "D": "I grew up near a beautiful lake, and swimming there with my friends was one of my favorite things to do. It was such a great way to spend time outdoors, though rainy days sometimes left me feeling bored at home. Nowadays, I practice yoga to relax and recharge after long working hours. It has helped me stay calm, balanced, and focused. Yoga has become an important part of my routine and a great way to take care of both my body and mind."
    },
    "statements": [
      {
        "statement": "Who now enjoys video games?",
        "correct": "C"
      },
      {
        "statement": "Who enjoys podcasting with friends?",
        "correct": "A"
      },
      {
        "statement": "Who loved swimming as a child?",
        "correct": "D"
      },
      {
        "statement": "Who loved puzzles as a child?",
        "correct": "C"
      },
      {
        "statement": "Who now prefers yoga?",
        "correct": "D"
      },
      {
        "statement": "Who loved kite flying as a child?",
        "correct": "B"
      },
      {
        "statement": "Who finds modern apps easier to use?",
        "correct": "A"
      }
    ]
  },
  {
    "id": 11,
    "topic": "Job and trainning",
    "texts": {
      "A": "When I first graduated from school, I wasn’t sure what to do, so I joined several volunteer programs with different companies and organizations to gain experience. I really enjoyed volunteering because it helped me decide on a career path and gave me many valuable lessons. I also believe I was able to make a difference through my work.",
      "B": "Back in school, I already knew I wanted to become a teacher, so I didn’t need to try other jobs. I decided to study education at university, which is free in my country. Last summer, I did some practical training in local schools, and it was extremely helpful for my future career.",
      "C": "When I was young, I used to help my neighbor, a plumber, with simple jobs like measuring pipes, loosening screws, and handling tools. It felt very natural for me to learn that kind of work, so later I studied for two years at university to become an electrician. Now, I’ve learned that there are shorter courses available in this field, and I regret not choosing that option instead.",
      "D": "After graduating, I found it really difficult to get a job. I applied to many companies, but none accepted me because I lacked experience. Eventually, I found work at a gaming company that allowed me to work from home. It didn’t affect my daily schedule — I worked at night while my colleagues worked during the day — and that arrangement suited me perfectly."
    },
    "statements": [
      {
        "statement": "Who likes working with their hands?",
        "correct": "C"
      },
      {
        "statement": "Who enjoys working during their training?",
        "correct": "B"
      },
      {
        "statement": "Who thinks it is very hard to get your first job?",
        "correct": "D"
      },
      {
        "statement": "Who thinks their training was too long?",
        "correct": "C"
      },
      {
        "statement": "Who did not want to choose another job?",
        "correct": "B"
      },
      {
        "statement": "Who enjoys working in a flexible working environment?",
        "correct": "D"
      },
      {
        "statement": "Who thinks they benefited from working for free?",
        "correct": "A"
      }
    ]
  },
  {
    "id": 12,
    "topic": "Music festival (phiên bản 3)",
    "texts": {
      "A": "This was my first time attending the Music Festival, and to be honest, the weather really didn't cooperate. It rained heavily on the first two days, which made it difficult to enjoy the outdoor activities. I still got wet in the tent. But I didn't let that ruin the experience. On the final day, the skies cleared up and the performances were truly amazing - especially the final act in the evening. That last day made it all worthwhile, and I left with some great memories despite the poor weather.",
      "B": "I've been to this festival a couple of times in the past, the quality was good the last times I came, but this time is completely different. The sound quality wasn't great, and the whole event just felt disorganised. There weren't enough facilities, and the staff didn't seem prepared to handle the crowd. I couldn't even interact with the band. I don't think I'll be coming back next year. It's simply not worth the money or the time anymore.",
      "C": "The festival this year had one of the best line-ups I've seen so far. I absolutely loved the energy of the performances, and the music was spot on throughout the weekend. However, I have to say the ticket prices were far too high, especially for students. I paid almost double what I did two years ago, and although I enjoyed the music, I'm not sure it offered good value for money. If they don't lower the prices next year, a lot of people might skip it.",
      "D": "We were playing in a band and we finished our performance in the morning. However, I stayed at the festival to meet up with some old band mates. We talked a lot. However, I didn't like the venue. It was too crowded and not well organised. The road to the tent village was also congested. I think they should choose a better location next year."
    },
    "statements": [
      {
        "statement": "Who liked the last performance of the show?",
        "correct": "A"
      },
      {
        "statement": "Who was disappointed with the festival?",
        "correct": "B"
      },
      {
        "statement": "Who thought it was too expensive?",
        "correct": "C"
      },
      {
        "statement": "Who experienced bad weather?",
        "correct": "A"
      },
      {
        "statement": "Who liked to meet old friends?",
        "correct": "D"
      },
      {
        "statement": "Who enjoyed the music at the event?",
        "correct": "C"
      },
      {
        "statement": "Who didn't like the venue?",
        "correct": "D"
      }
    ]
  },
  {
    "id": 13,
    "topic": "Volunteering",
    "texts": {
      "A": "I’m very busy and rarely have any free time to do anything, so even spending a few hours volunteering is quite difficult. I would have to take half a day off work. I see many people in need, and they genuinely require additional financial support. That’s something I can help with because I earn a good salary. Making monthly donations is not a problem for me—it’s how I show my support and contribution.",
      "B": "Some people enjoy volunteering abroad, but honestly, I feel that most people are more interested in traveling. I believe we should use our time more meaningfully. Every town has many people in need. Their circumstances are difficult, and they lack the means to improve their quality of life. They are individuals who have contributed a great deal to the country. Sharing stories with them helps us understand the differences between generations. We can also broaden our knowledge of local history, traditions, and culture through their experiences.",
      "C": "I believe there are many ways for us to show kindness through volunteering. I am currently retired and helping to build houses for people in need. I work with a volunteer organization that has well-prepared and clear plans. Through this work, I have had the opportunity to experience different foreign cultures. We are often sent to various countries to carry out projects, so it’s also a great way to travel while still doing something meaningful. This work involves physical labor, which helps improve our physical health—something some people only begin to realize after some time.",
      "D": "My mother told me to do local volunteering because she is a member of that organization, but I’m not very interested. I prefer volunteering abroad because I can develop soft skills—something that will benefit my future career. In addition, meeting new people helps me expand my network and build valuable connections that I can use later in my professional life."
    },
    "statements": [
      {
        "statement": "Who wants to enhance their future career?",
        "correct": "D"
      },
      {
        "statement": "Who helps support charity work with money?",
        "correct": "A"
      },
      {
        "statement": "Who thinks it should help the local community?",
        "correct": "B"
      },
      {
        "statement": "Who thinks volunteering helps improve physical health?",
        "correct": "C"
      },
      {
        "statement": "Who thinks it can improve knowledge about culture?",
        "correct": "B"
      },
      {
        "statement": "Who thinks it is a way to travel?",
        "correct": "C"
      },
      {
        "statement": "Who wants to make new friends?",
        "correct": "D"
      }
    ]
  },
  {
    "id": 14,
    "topic": "Career",
    "texts": {
      "A": "After graduating, I wanted to take some time to figure out what I truly wanted. I started looking for temporary jobs, but it was quite difficult because most companies don’t hire people without experience. Eventually, a game company contacted me, and I agreed to work for them. The job is hybrid, so sometimes I work in the evenings, but I’m fine with that.",
      "B": "I went to university right after finishing high school. I had always wanted to become a teacher, so I didn’t need to explore other career options. Three months ago, I did an internship at a local school. It was an eye-opening experience, even though the workload was heavier than I expected. However, I believe it was very worthwhile.",
      "C": "When I graduated, I didn’t really know what I wanted to do. Some people advised me to start working right away, but I wanted to gain some practical experience first. That’s why I applied for various volunteer positions. Although I didn’t earn any money, I had the chance to try out different types of work. Looking back, I feel happy with my decision because of the valuable knowledge I gained.",
      "D": "When I was younger, I lived near a plumber and sometimes worked with her. She gave me simple tasks like checking for pipe leaks or tightening screws. So later on, it felt natural for me to go to university to become an electrician. Now, when I see short online electrical courses, I wish I had chosen them instead of going to university."
    },
    "statements": [
      {
        "statement": "Who did not want to change to other careers?",
        "correct": "B"
      },
      {
        "statement": "Who thinks it was hard to get the first job?",
        "correct": "A"
      },
      {
        "statement": "Who enjoys working in a flexible work environment?",
        "correct": "A"
      },
      {
        "statement": "Who enjoyed doing things with their hands?",
        "correct": "D"
      },
      {
        "statement": "Who thinks their training was too long?",
        "correct": "D"
      },
      {
        "statement": "Who enjoyed working when training?",
        "correct": "B"
      },
      {
        "statement": "Who thinks they benefited from working for free?",
        "correct": "C"
      }
    ]
  }
],
  part5: [
  {
    "id": 1,
    "topic": "Mountain (Mountain summits)",
    "paragraphs": [
      {
        "num": 1,
        "text": "The term \"mountain\" has evolved over time, reflecting not only physical characteristics but also cultural significance. In contemporary discussions, mountains may symbolize challenges to overcome or destinations for adventure, transcending their geographical attributes.",
        "correct": "Changing the definition of mountain"
      },
      {
        "num": 2,
        "text": "Climbing a mountain often leads to a profound sense of accomplishment. It represents not just reaching a physical summit but also conquering personal fears and pushing one's limits, creating memories that last a lifetime.",
        "correct": "The unique feeling of achievement"
      },
      {
        "num": 3,
        "text": "In today's digital age, sharing achievements has become prevalent. Climbing a mountain is frequently documented on social media, turning personal milestones into public spectacles that inspire others while also raising questions about authenticity.",
        "correct": "Publicity of achievement"
      },
      {
        "num": 4,
        "text": "The pursuit of climbing mountains can sometimes lead to misplaced priorities. While seeking adventure and recognition, individuals may neglect personal relationships or responsibilities, emphasizing the need for a balanced approach to life.",
        "correct": "The mistake of misplaced priorities"
      },
      {
        "num": 5,
        "text": "Engaging in extreme sports, such as mountain climbing, can forge strong bonds among participants. However, it may also create worrying connections where individuals prioritize adrenaline over safety, potentially leading to dangerous situations.",
        "correct": "Worrying connections"
      },
      {
        "num": 6,
        "text": "While adventure is thrilling, there is a growing recognition of the importance of stability in life. Balancing the desire for adventure with the need for security is crucial, prompting individuals to reflect on their life choices and long-term goals.",
        "correct": "Focus on stability"
      },
      {
        "num": 7,
        "text": "Shared experiences in challenging environments, like mountains, can deepen intimacy in relationships. Couples or friends who navigate the challenges of climbing together often find their bonds strengthened through mutual support and understanding.",
        "correct": "Intimate relationships"
      }
    ],
    "headings": [
      "Intimate relationships",
      "Changing the definition of mountain",
      "Worrying connections",
      "Publicity of achievement",
      "Focus on stability",
      "The mistake of misplaced priorities",
      "The unique feeling of achievement"
    ]
  },
  {
    "id": 2,
    "topic": "Four-Day Workweek",
    "paragraphs": [
      {
        "num": 1,
        "text": "For many years, a workweek of five or even six days was the standard. However, advancements in technology, evolving social values, and an increasing emphasis on work-life balance are making this traditional schedule less relevant. Both employees and employers are starting to question whether spending the majority of one’s week at work is truly necessary or productive.",
        "correct": "A way of life now out date"
      },
      {
        "num": 2,
        "text": "Proponents of a four-day workweek highlight various benefits for workers. With an extra day off, employees gain more time to recharge, connect with family, or explore personal interests. Research shows that shorter workweeks can enhance focus and efficiency, leading to improved job performance and higher levels of job satisfaction.",
        "correct": "Benefits for employees"
      },
      {
        "num": 3,
        "text": "While appealing, a reduced workweek could have financial downsides. Companies might incur higher expenses from the need to hire additional staff or adjust compensation models. For sectors that rely on hourly employees, it may be difficult to maintain profitability, potentially leading to service reductions or job cuts.",
        "correct": "Undesirable finalcial consequences"
      },
      {
        "num": 4,
        "text": "Adapting to a new work schedule can be difficult for some employees. The pressure to complete tasks within a shorter timeframe can lead to stress, and fast-paced industries may face challenges such as missed deadlines or conflicting schedules, complicating the transition to a shorter workweek.",
        "correct": "Unforeseen challenges for employees"
      },
      {
        "num": 5,
        "text": "For individuals accustomed to traditional work hours, the shift to a four-day workweek can be challenging. Breaking long-established routines is tough, and some may resist change even when it offers potential benefits. Adapting to a new work pattern often requires time and support.",
        "correct": "Difficult to change old habits"
      },
      {
        "num": 6,
        "text": "While a four-day workweek may sound ideal to many, it isn’t necessarily fair to all. Essential workers, healthcare providers, and employees in the hospitality industry may not have the option to reduce their hours. This could create disparities among different worker groups and lead to tension within the workforce.",
        "correct": "Unfair for some people"
      },
      {
        "num": 7,
        "text": "Rather than universally implementing a four-day workweek, experts suggest considering more flexible arrangements. Options such as allowing employees to choose their days off or offering shorter daily hours can provide similar advantages without disrupting industries that depend on a traditional work schedule.",
        "correct": "Alternative solutions worth considering"
      }
    ],
    "headings": [
      "A way of life now out date",
      "Unforeseen challenges for employees",
      "Undesirable finalcial consequences",
      "Unfair for some people",
      "Benefits for employees",
      "Alternative solutions worth considering",
      "Difficult to change old habits"
    ]
  },
  {
    "id": 3,
    "topic": "Digital transformation (Tech Forward)",
    "paragraphs": [
      {
        "num": 1,
        "text": "The interaction between people and technology is continuously evolving. Modern gadgets and software are designed to be more user-friendly, enabling communication through voice commands, gestures, or even facial recognition. This transformation makes technology more intuitive and accessible, enhancing both personal and professional experiences.",
        "correct": "Redefining business models with technology"
      },
      {
        "num": 2,
        "text": "Smart automation tools are revolutionizing workplaces by handling repetitive and time-consuming tasks. These technologies, often powered by AI, enable employees to concentrate on more valuable work, boosting efficiency and fostering innovation across various sectors.",
        "correct": "Enhancing productivity through automation"
      },
      {
        "num": 3,
        "text": "Educational institutions are increasingly incorporating technology into their curricula to prepare students for future careers. Programs focused on coding, robotics, and digital literacy provide learners with vital skills for the digital age, promoting creativity and enhancing problem-solving abilities.",
        "correct": "Promoting digital skills training"
      },
      {
        "num": 4,
        "text": "Although digital devices offer numerous advantages, over-reliance on screens can lead to negative consequences. Individuals may experience reduced social interactions, trouble concentrating, and higher stress levels. It’s crucial to balance digital engagement with offline activities for maintaining mental and physical well-being.",
        "correct": "Over-reliance on automated systems"
      },
      {
        "num": 5,
        "text": "Not everyone has equal access to technology, which can result in significant social and economic divides. Those without reliable internet or modern devices may miss out on educational and employment opportunities, making it essential to address these inequalities through policies and community-driven efforts.",
        "correct": "Concerns about cybersecurity risks"
      },
      {
        "num": 6,
        "text": "Tech communities unite individuals passionate about technology to exchange ideas, support projects, and collaborate. These groups encourage innovation and creativity, offering mentorship and resources to help transform new ideas into reality.",
        "correct": "Building inclusive digital ecosystems"
      },
      {
        "num": 7,
        "text": "As technology continues to evolve, there is a growing focus on sustainability. Companies are developing eco-friendly products and adopting green practices to reduce environmental impact, ensuring that digital advancements contribute to long-term ecological health.",
        "correct": "Focusing on ethical technology development"
      }
    ],
    "headings": [
      "Building inclusive digital ecosystems",
      "Promoting digital skills training",
      "Focusing on ethical technology development",
      "Over-reliance on automated systems",
      "Concerns about cybersecurity risks",
      "Enhancing productivity through automation",
      "Redefining business models with technology"
    ]
  },
  {
    "id": 4,
    "topic": "Wellness trend",
    "paragraphs": [
      {
        "num": 1,
        "text": "In recent years, the definition of health has broadened to encompass more than just physical well-being. Holistic approaches emphasize the interconnection of the body, mind, and environment, encouraging individuals to consider emotional balance, mental clarity, nutrition, and lifestyle habits collectively. This more comprehensive view helps people achieve deeper and more sustainable wellness by addressing various aspects of life rather than isolated symptoms.",
        "correct": "Redefining holistic health approaches"
      },
      {
        "num": 2,
        "text": "Mental health has become a growing priority in public health discussions. Awareness campaigns aim to reduce the stigma surrounding mental health disorders and encourage open conversations about personal struggles. Educating people on recognizing early signs of anxiety, depression, and stress empowers them to seek help sooner. Many organizations also provide support networks and resources to build a more compassionate and understanding society.",
        "correct": "Promoting mental health awareness"
      },
      {
        "num": 3,
        "text": "Community-based fitness initiatives are becoming more popular as a way to make exercise enjoyable and accessible. By participating in group activities such as yoga, walking clubs, or sports leagues, individuals not only improve their physical health but also form meaningful social connections. These programs foster a sense of belonging and help individuals stay committed to their fitness goals over time, contributing to healthier and happier communities.",
        "correct": "Encouraging community fitness programs"
      },
      {
        "num": 4,
        "text": "Although trendy diets often promise quick weight loss or improved health, relying too heavily on these fads can be problematic. Many popular diets lack scientific support and may eliminate essential nutrients, leading to unbalanced nutrition. Nutrition experts emphasize that sustainable eating should focus on balanced meals, moderation, and individual needs rather than quick fixes. Building a healthy relationship with food is more beneficial than chasing the latest diet trend.",
        "correct": "Overemphasis on trendy diets"
      },
      {
        "num": 5,
        "text": "The rise of social media and online platforms has led to widespread sharing of health information, but not all of it is accurate or safe. Misinformation about supplements, treatments, and health practices can cause confusion or even harm. It’s crucial for individuals to critically assess sources, consult healthcare professionals, and rely on evidence-based guidance when making decisions about their wellness routines.",
        "correct": "Concerns about wellness misinformation"
      },
      {
        "num": 6,
        "text": "Supportive wellness-focused communities play an essential role in helping people maintain healthy lifestyles. Whether online or through local meetups, these groups offer encouragement, share tips, and provide accountability. Members can exchange experiences, celebrate successes, and find motivation during challenges, creating an environment where individuals feel empowered to achieve their health goals.",
        "correct": "Building supportive health communities"
      },
      {
        "num": 7,
        "text": "Achieving long-term health requires more than temporary diets or exercise bursts. Sustainable wellness involves making gradual changes that can be maintained over time, such as improving sleep habits, managing stress, and incorporating regular physical activity. By setting realistic goals and making incremental adjustments, individuals are more likely to experience lasting benefits and enhance their overall quality of life.",
        "correct": "Focusing on sustainable lifestyle changes"
      }
    ],
    "headings": [
      "Building supportive health communities",
      "Encouraging community fitness programs",
      "Promoting mental health awareness",
      "Focusing on sustainable lifestyle changes",
      "Redefining holistic health approaches",
      "Overemphasis on trendy diets",
      "Concerns about wellness misinformation"
    ]
  },
  {
    "id": 5,
    "topic": "Women mathematicians",
    "paragraphs": [
      {
        "num": 1,
        "text": "Long before modern scientific institutions emerged, certain individuals in ancient history established the foundations of mathematics as we know it. One such pioneer was Hypatia of Alexandria, a famous philosopher and mathematician in the 4th century.",
        "correct": "Breaking New Ground in Ancient Mathematics"
      },
      {
        "num": 2,
        "text": "The early 20th century saw remarkable advancements in computing, largely propelled by the innovative work of figures like Alan Turing. Turing’s concept of a universal machine, capable of performing any computable task, laid the foundation for modern computers.",
        "correct": "Trailblazing Computer Science"
      },
      {
        "num": 3,
        "text": "Humanity’s quest to explore the cosmos has been defined by groundbreaking milestones. From the launch of Sputnik 1 to the Apollo moon landings, each mission has broadened our understanding of space and our place in the universe.",
        "correct": "Driving Space Exploration Forward"
      },
      {
        "num": 4,
        "text": "The study of geometry and motion was irrevocably altered by the works of Isaac Newton and later Albert Einstein. Newton’s laws provided the mathematical foundation for understanding motion on Earth and in space, while Einstein’s theory of general relativity revolutionized our understanding of gravity.",
        "correct": "Transforming Geometry and Motion"
      },
      {
        "num": 5,
        "text": "One of the most profound ideas in modern physics is the link between symmetry and the laws of nature. Emmy Noether, a brilliant German mathematician, proved a theorem that demonstrated how physical laws are intrinsically linked to symmetrical properties.",
        "correct": "Connecting Symmetry to Physics"
      },
      {
        "num": 6,
        "text": "Despite advancements in science and technology, many groups remain underrepresented in STEM fields. In recent decades, educators and organizations have worked to foster more inclusive environments, offering scholarships, mentorship, and outreach programs.",
        "correct": "Encouraging Diversity in STEM"
      },
      {
        "num": 7,
        "text": "In many parts of the world, individuals have had to fight for the right to education, particularly in scientific disciplines. A well-known example is the story of 19th-century women who were denied entry to universities.",
        "correct": "Breaking Through Educational Barriers"
      }
    ],
    "headings": [
      "Driving Space Exploration Forward",
      "Breaking Through Educational Barriers",
      "Encouraging Diversity in STEM",
      "Trailblazing Computer Science",
      "Connecting Symmetry to Physics",
      "Transforming Geometry and Motion",
      "Breaking New Ground in Ancient Mathematics"
    ]
  },
  {
    "id": 6,
    "topic": "Technology advances",
    "paragraphs": [
      {
        "num": 1,
        "text": "The way people use technology is changing quickly. Today, new devices and apps are easier to use. People can talk to machines, use hand gestures, or even use their face to control them. This helps make technology feel more natural and simple. It also improves how we use technology in our daily life and at work.",
        "correct": "Redefining Human-Technology Interaction"
      },
      {
        "num": 2,
        "text": "Smart machines and software are now doing boring and repeated tasks in many workplaces. These tools, often powered by artificial intelligence (AI), save time and help workers focus on more important and creative jobs. As a result, companies work better and grow faster in many fields.",
        "correct": "Boosting Productivity Through Intelligent Automation"
      },
      {
        "num": 3,
        "text": "More and more schools are using technology in their lessons. They teach students skills like computer coding, robotics, and how to use digital tools. These programs help students prepare for future jobs, and also build creativity and problem-solving skills, which are important in the digital world.",
        "correct": "Promoting Technology-Based Education Programs"
      },
      {
        "num": 4,
        "text": "Using digital devices too much can cause problems. Spending too much time in front of screens can make people feel lonely, stressed, or tired. It can also make it harder to focus or talk with others. That’s why it's important to have a good balance between screen time and offline activities like exercise, talking with friends, or enjoying nature.",
        "correct": "Overreliance on Digital Interfaces"
      },
      {
        "num": 5,
        "text": "Not everyone has the same access to technology. Some people don’t have fast internet or modern devices, so they miss chances to learn or find jobs. This creates unfair gaps in society. To fix this, we need good plans and community programs to give more people access to the tools they need.",
        "correct": "Concerns About Disparities in Access to Technology"
      },
      {
        "num": 6,
        "text": "Technology communities are groups of people who love working with tech. They share ideas, help each other, and work together on new projects. These communities support learning and help turn smart ideas into real products or services that can help others.",
        "correct": "Building Innovative Tech Communities"
      },
      {
        "num": 7,
        "text": "As technology grows, people are also thinking about the environment. Many companies are now creating eco-friendly products and using green practices to reduce harm to nature. These actions help protect the Earth and make sure that digital progress is good for our planet in the long term.",
        "correct": "Focusing on Sustainable Digital Solutions"
      }
    ],
    "headings": [
      "Building Innovative Tech Communities",
      "Promoting Technology-Based Education Programs",
      "Overreliance on Digital Interfaces",
      "Focusing on Sustainable Digital Solutions",
      "Redefining Human-Technology Interaction",
      "Concerns About Disparities in Access to Technology",
      "Boosting Productivity Through Intelligent Automation"
    ]
  },
  {
    "id": 7,
    "topic": "Cultural Exchange",
    "paragraphs": [
      {
        "num": 1,
        "text": "In the modern interconnected world, understanding global cultures involves much more than simply learning about customs and traditions. It requires the development of cultural intelligence and awareness. Redefining cultural understanding means moving beyond surface-level knowledge and gaining a deeper appreciation of shared human experiences while still respecting the unique identities of different cultures.",
        "correct": "Redefining Global Cultural Understanding"
      },
      {
        "num": 2,
        "text": "Festivals that celebrate multiple cultures play an important role in promoting unity and inclusiveness among diverse communities. Such events create opportunities for different groups to present and celebrate their art, music, food, and cultural heritage while encouraging people to appreciate cultural diversity.",
        "correct": "Encouraging Cross-Cultural Festivals"
      },
      {
        "num": 3,
        "text": "Language exchange programs are among the most effective ways to encourage intercultural communication. By participating in these programs, individuals can better understand cultural subtleties such as humor, idiomatic expressions, and nonverbal communication.",
        "correct": "Promoting Language Exchange Programs"
      },
      {
        "num": 4,
        "text": "Although tourism can contribute significantly to economic development, excessive commercialization may weaken genuine cultural exchange. Many well-known destinations face the risk of being turned into commercialized attractions rather than places that reflect authentic cultural values.",
        "correct": "Overemphasis on Commercial Tourism"
      },
      {
        "num": 5,
        "text": "The rapid pace of globalization and urban development has increased concerns about the disappearance of intangible cultural heritage. Many traditional elements such as languages, rituals, folk customs, and handicrafts are gradually fading away.",
        "correct": "Concerns About Cultural Preservation"
      },
      {
        "num": 6,
        "text": "Successful cultural exchange depends strongly on mutual respect and empathy between communities. Instead of merely tolerating differences, people should aim to develop sincere understanding and appreciation of other cultures.",
        "correct": "Building Mutual Respect Among Communities"
      },
      {
        "num": 7,
        "text": "Interest in authentic cultural experiences is steadily increasing. Many travelers now prefer opportunities to interact with local communities, learn traditional skills, and take part in everyday cultural activities.",
        "correct": "Focusing on Authentic Cultural Experiences"
      }
    ],
    "headings": [
      "Concerns About Cultural Preservation",
      "Encouraging Cross-Cultural Festivals",
      "Focusing on Authentic Cultural Experiences",
      "Overemphasis on Commercial Tourism",
      "Promoting Language Exchange Programs",
      "Building Mutual Respect Among Communities",
      "Redefining Global Cultural Understanding"
    ]
  },
  {
    "id": 8,
    "topic": "Urban Development",
    "paragraphs": [
      {
        "num": 1,
        "text": "Modern urban development increasingly focuses on sustainability as cities face growing populations and environmental challenges. Redefining sustainable city planning means integrating environmental protection, efficient land use, and long-term economic growth into urban strategies. Planners aim to design cities that balance development with ecological responsibility while improving residents’ quality of life.",
        "correct": "Redefining Sustainable City Planning"
      },
      {
        "num": 2,
        "text": "One key aspect of sustainable city planning is the creation of more green spaces. Parks, urban forests, and community gardens help reduce pollution, improve air quality, and provide residents with areas for recreation and relaxation. Green spaces also contribute to better mental health and create a healthier living environment in densely populated cities.",
        "correct": "Encouraging Green Spaces in Urban Areas"
      },
      {
        "num": 3,
        "text": "As cities expand, ensuring access to affordable housing becomes a major priority. Governments and developers must work together to create housing projects that are accessible to different income groups. Affordable housing helps reduce inequality and allows more people to live closer to workplaces, schools, and essential services.",
        "correct": "Supporting Affordable Housing Projects"
      },
      {
        "num": 4,
        "text": "However, rapid urbanization has led many cities to depend heavily on high-rise developments to accommodate population growth. While tall buildings can maximize land use, excessive reliance on them may reduce community interaction and place pressure on infrastructure. Balanced urban design should combine vertical development with livable neighborhood spaces.",
        "correct": "Overreliance on High-Rise Buildings"
      },
      {
        "num": 5,
        "text": "Another challenge linked to rapid urban growth is increasing traffic congestion. As more people move into cities, transportation systems often struggle to keep up with demand. Long commuting times, air pollution, and road overcrowding can negatively affect both the environment and residents’ daily lives.",
        "correct": "Concerns About Traffic Congestion"
      },
      {
        "num": 6,
        "text": "To address these challenges effectively, community participation plays an important role in urban planning. Local residents can provide valuable insights into their needs and priorities. When communities are actively involved in decision-making, city policies become more inclusive and better suited to real-life conditions.",
        "correct": "Strengthening Community Engagement"
      },
      {
        "num": 7,
        "text": "Finally, sustainable urban development requires a transition toward renewable energy sources. Cities are increasingly investing in solar power, wind energy, and energy-efficient infrastructure to reduce carbon emissions. By adopting clean energy solutions, urban areas can move closer to becoming environmentally responsible and resilient for the future.",
        "correct": "Focusing on Renewable Energy Source"
      }
    ],
    "headings": [
      "Strengthening Community Engagement",
      "Focusing on Renewable Energy Source",
      "Concerns About Traffic Congestion",
      "Supporting Affordable Housing Projects",
      "Overreliance on High-Rise Buildings",
      "Redefining Sustainable City Planning",
      "Encouraging Green Spaces in Urban Areas"
    ]
  },
  {
    "id": 9,
    "topic": "Digital innovation",
    "paragraphs": [
      {
        "num": 1,
        "text": "In today’s digital age, technology has fundamentally transformed the way people experience leisure. It has changed how individuals relax, interact with others, and consume entertainment. With innovations such as on-demand streaming services and virtual reality gaming, users can now enjoy highly customized entertainment experiences that match their personal preferences. Nevertheless, these technological advances can blur the line between work and leisure, as smartphones and online platforms constantly compete for people’s attention. Therefore, redefining leisure in the modern digital world involves finding a balance between technological convenience and maintaining offline well-being, ensuring that technology improves quality of life rather than creating excessive dependence on digital devices.",
        "correct": "Redefining Leisure in the Digital age"
      },
      {
        "num": 2,
        "text": "Mobile applications have emerged as powerful tools that strengthen global connectivity. They have significantly changed the way people communicate, cooperate, and build relationships. Through services such as instant messaging, video calls, and AI-powered social platforms, mobile apps allow individuals to interact instantly regardless of geographic or cultural distances. In addition to supporting personal communication, app ecosystems also facilitate professional networking, online education, telemedicine, and international trade. However, the increasing dependence on these technologies can also create challenges, including digital exhaustion and fierce competition for users’ attention. To fully realize their advantages, developers should design applications that emphasize accessibility, inclusiveness, and smooth integration into everyday life.",
        "correct": "Enhancing Connectivity with Mobile Apps"
      },
      {
        "num": 3,
        "text": "As the world becomes more digitally oriented, digital literacy has become a crucial competency for education, career development, and civic engagement. This skill goes beyond basic technical knowledge and also includes the ability to think critically, evaluate information sources, and behave responsibly in online environments. Educational institutions, businesses, and governments need to work together to create initiatives that help individuals effectively navigate digital platforms, protect their personal data, and identify misinformation. Reducing the digital divide is especially important so that disadvantaged communities can also access economic and social opportunities. Strengthening digital literacy ultimately promotes equal access and prepares people for success in an increasingly technology-driven society.",
        "correct": "Promoting Essential Digital Literacy"
      },
      {
        "num": 4,
        "text": "Although modern technology has greatly expanded entertainment options, excessive dependence on screen-based activities can lead to serious health and social problems. Spending long periods using smartphones, playing video games, or watching online streaming content may cause eye strain, disrupted sleep patterns, decreased physical activity, and shorter attention spans. On a social level, people may feel isolated if digital entertainment replaces meaningful real-life interactions. Addressing these concerns requires a balanced strategy that encourages digital well-being, promotes outdoor activities, and supports mindful media consumption. As technology continues to evolve, society must redefine healthy forms of entertainment that provide benefits without harming physical or mental health.",
        "correct": "Risks of Excessive Screen-Based Entertainment"
      },
      {
        "num": 5,
        "text": "The rapid expansion of digital technologies has intensified discussions about protecting personal data. As AI-based services, online shopping, and social media platforms grow quickly, users frequently share sensitive information, often without fully understanding the potential consequences. Issues such as data breaches, unauthorized monitoring, and algorithm-based profiling have raised worries about surveillance, misuse of information, and reduced personal autonomy. To address these risks, governments, technology companies, and advocacy organizations need to cooperate in establishing stronger data protection regulations, improving transparency, and giving users greater control over their personal information. In a world where data is increasingly valuable for innovation, safeguarding privacy is vital to maintaining trust and ethical technological development.",
        "correct": "Concerns About Data Privacy"
      },
      {
        "num": 6,
        "text": "Online platforms have the potential to connect individuals from around the world, but they can also intensify division, misinformation, and exclusion if they are not properly managed. Creating inclusive digital communities requires thoughtful design that ensures people from various backgrounds feel respected and represented. This process involves addressing problems such as cyberbullying, hate speech, and bias in algorithms, while also ensuring fair access for underrepresented groups. Social media platforms and community-based applications should emphasize transparency, diversity, and cooperative governance, allowing users to influence the standards of online interaction. When inclusivity becomes a central design principle, digital environments can encourage meaningful connections rather than deepen social fragmentation.",
        "correct": "Building Inclusive and Respectful Online Communities"
      },
      {
        "num": 7,
        "text": "In a time of rapid technological progress, intuitive and user-friendly design has become a key factor in the success of digital products. An effective interface is not only visually appealing but also simplifies complex systems, improves accessibility, and ensures that technology supports users instead of overwhelming them. Many companies now follow human-centered design principles by using user feedback, behavioral data analysis, and accessibility testing to develop products that address a wide range of needs. Focusing on usability not only increases customer satisfaction but also encourages digital inclusion, ensuring that technological innovation remains practical, engaging, and accessible to people of all ages, abilities, and levels of technical expertise.",
        "correct": "Prioritize human-friendly designs"
      }
    ],
    "headings": [
      "Enhancing Connectivity with Mobile Apps",
      "Prioritize human-friendly designs",
      "Redefining Leisure in the Digital age",
      "Promoting Essential Digital Literacy",
      "Risks of Excessive Screen-Based Entertainment",
      "Concerns About Data Privacy",
      "Building Inclusive and Respectful Online Communities"
    ]
  },
  {
    "id": 10,
    "topic": "Women mathematicians (phiên bản 2)",
    "paragraphs": [
      {
        "num": 1,
        "text": "Achievements often go unnoticed when gender biases come into play. Many groundbreaking contributions from women in science, technology, and other fields are overshadowed by societal expectations, leading to a lack of recognition for their hard work and dedication.",
        "correct": "Achievements obscured by gender"
      },
      {
        "num": 2,
        "text": "Recognizing the accomplishments of pioneering women is essential for breaking stereotypes and inspiring future generations. Women like Marie Curie, Ada Lovelace, and Katherine Johnson changed the world with their brilliance, yet their achievements were often marginalized due to their gender.",
        "correct": "Recognizing the accomplishments of pioneering women"
      },
      {
        "num": 3,
        "text": "Men are unfairly given credit for work that was often a joint effort or even led by women. History has been shaped by this bias, where the achievements of women were either ignored or misattributed, despite their immense contributions to progress.",
        "correct": "Men are unfairly given credit"
      },
      {
        "num": 4,
        "text": "A long career is a testament to one's exceptional abilities. Take the story of a female engineer who spent decades improving infrastructure in underdeveloped regions. Despite her groundbreaking work, she was often overlooked simply because of her gender, but her work left an indelible mark on society.",
        "correct": "A long career demonstrates exceptional ability"
      },
      {
        "num": 5,
        "text": "Labels can change perceptions dramatically. The label of 'genius' or 'pioneer' is often reserved for men, but when a woman is labeled in the same way, it challenges stereotypes and forces society to recognize her contributions. This shift in perception is key to breaking down barriers and opening doors for others.",
        "correct": "The labels can change perceptions"
      },
      {
        "num": 6,
        "text": "Striving to create gender balance in the workplace and society at large has become a movement. Companies and governments are starting to realize that diverse teams lead to better solutions, yet the struggle for equal representation continues. The push for gender balance is not just about fairness but also about enhancing productivity and creativity.",
        "correct": "Striving to create gender balance"
      },
      {
        "num": 7,
        "text": "Uniformity can be a disadvantage in many settings. When everyone is expected to conform to the same mold, innovation and individuality suffer. The story of a diverse team at a tech startup shows how embracing different perspectives led to creative breakthroughs, proving that diversity is a powerful asset.",
        "correct": "Uniformity can be a disadvantage"
      }
    ],
    "headings": [
      "The labels can change perceptions",
      "Men are unfairly given credit",
      "A long career demonstrates exceptional ability",
      "Recognizing the accomplishments of pioneering women",
      "Uniformity can be a disadvantage",
      "Striving to create gender balance",
      "Achievements obscured by gender"
    ]
  },
  {
    "id": 11,
    "topic": "Mountain (Mountain summits) (phiên bản 2)",
    "paragraphs": [
      {
        "num": 1,
        "text": "In the modern consciousness, the definition of a mountain has evolved far beyond its geological description as a massive landform of rock and ice. Historically viewed as sacred barriers or purely natural entities, mountains are increasingly defined by humans as 'vertical arenas' for personal testing. This conceptual shift transforms the mountain from a part of the ecosystem into a commodity—a challenge to be overcome rather than a landscape to be respected.",
        "correct": "Changing the definition of mountain"
      },
      {
        "num": 2,
        "text": "This new definition is driven by a powerful psychological reward: the unique feeling of achievement. When a climber pushes their physical limits to reach a summit, the combination of exhaustion and altitude creates a potent cocktail of adrenaline and pride. It is a singular sensation of conquering the impossible, offering a temporary escape from the mundane routines of daily life. This internal 'high' creates a deep-seated desire to return.",
        "correct": "The unique feeling of achievement"
      },
      {
        "num": 3,
        "text": "However, in our hyper-connected era, internal satisfaction is rarely enough; it is the publicity of achievement that now drives the masses. The solitude of the peaks is often broken by the need to document and broadcast the success on social media. The mountain becomes a backdrop for digital validation, where the value of the climb is measured in likes and shares rather than personal growth.",
        "correct": "Publicity of achievement"
      },
      {
        "num": 4,
        "text": "The obsession with public recognition inevitably establishes the wrong priority. Instead of prioritizing safety, skill acquisition, or the appreciation of nature's subtle beauty, many climbers become fixated solely on 'bagging the peak'. This 'summit fever' encourages rushing, dangerous shortcuts, and a lack of preparation. The journey itself is ignored in a frantic race to the top, reducing the majestic experience to a mere checklist item.",
        "correct": "The wrong priority"
      },
      {
        "num": 5,
        "text": "This distorted mindset leads to a disturbing correlation—a troubling reality where our ego directly impacts the environment. As more people flock to the mountains with the wrong priorities, we witness a direct correlation between human traffic and environmental degradation. Trails are eroded, campsites are littered with non-biodegradable waste, and delicate wildlife habitats are disturbed.",
        "correct": "A disturbing correlation"
      },
      {
        "num": 6,
        "text": "Facing this ecological crisis, the mountaineering community is being forced to shift its focus on sustainability. We are realizing that the mountains are finite resources that cannot withstand endless abuse. This creates a new imperative: implementing stricter limits on climber numbers, enforcing 'leave no trace' policies, and promoting ethical tourism. The goal is shifting from conquering the land to preserving it.",
        "correct": "Focus on sustainability"
      },
      {
        "num": 7,
        "text": "Ultimately, this move toward preservation fosters a more intimate relationship with the mountain. When we stop viewing the peak as an enemy to defeat or a trophy to display, we begin to see it as a partner. This new relationship is built on humility, silence, and deep respect for the natural world. We learn to climb not just to stand on the mountain, but to be with the mountain.",
        "correct": "A more intimate relationship"
      }
    ],
    "headings": [
      "The wrong priority",
      "Changing the definition of mountain",
      "Focus on sustainability",
      "Publicity of achievement",
      "A more intimate relationship",
      "A disturbing correlation",
      "The unique feeling of achievement"
    ]
  }
]
};
