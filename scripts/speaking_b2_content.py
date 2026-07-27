"""Curated Aptis ESOL General Speaking models at a clear, accessible B2 level.

The source site data was collected from several practice pages, so its language
and task shape were uneven.  This module keeps the original topic coverage and
images, but replaces the prompts and model answers with consistent material:

* Part 1: about 30 seconds per answer.
* Parts 2 and 3: about 45 seconds per answer.
* Part 4: one integrated two-minute answer to three questions.

The vocabulary is intentionally common.  The B2 level comes from complete task
fulfilment, clear organisation, reasons, examples, comparison and controlled
complex sentences rather than rare words or memorised idioms.
"""

from __future__ import annotations

import re
from typing import Any


def s(text: str) -> str:
    """Collapse authoring whitespace while keeping ordinary punctuation."""
    return " ".join(text.split())


def split_sentences(text: str) -> list[str]:
    """Split model answers into short, speakable sentence units."""
    return [
        sentence.strip()
        for sentence in re.split(r"(?<=[.!?])\s+", text.strip())
        if sentence.strip()
    ]


def lower_first(text: str) -> str:
    """Lowercase a sentence start after a linking phrase such as 'First,'."""
    return text[:1].lower() + text[1:] if text else text


PART2_SETS = [
    (
        (
            "Describe the picture.",
            "Why do people like eating out with friends?",
            "Tell me about the last time you ate out with friends.",
        ),
        (
            s("""The picture shows five friends having a meal at an outdoor restaurant.
            They are sitting around a table with several plates, drinks and flowers.
            Everyone is smiling, and two people seem to be telling a funny story.
            The place looks bright and relaxed, so it may be a weekend lunch.
            They are dressed in casual clothes and appear to enjoy both the food and
            the chance to spend time together."""),
            s("""People like eating out with friends because it turns a normal meal
            into a social event. They can try food that they do not usually cook at
            home while talking about work, family or recent news. It is also easier
            because nobody has to prepare the meal or wash the dishes. Although a
            restaurant can cost more than eating at home, many people feel the shared
            time and pleasant setting make it worthwhile."""),
            s("""The last time I ate out with friends was two weeks ago after we
            finished a difficult project. We chose a small Vietnamese restaurant near
            our office because it was quiet and not too expensive. We ordered several
            dishes to share and talked for nearly two hours. One friend told us some
            funny stories, so we laughed a lot. I went home feeling relaxed because
            the meal gave us a good break from work."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "Tell me about the last time you travelled by car.",
            "How can people make a long journey easier?",
        ),
        (
            s("""In this picture, a family of five is travelling in a car. The father
            is driving, the mother is sitting beside him, and three children are in
            the back. Everyone is smiling, so they may be starting a family holiday.
            The adults are wearing sunglasses, and the car has a large window in the
            roof. The weather looks sunny, and the bags behind the children suggest
            that they are going on a fairly long trip."""),
            s("""The last time I travelled by car was during a weekend trip to Da Lat
            with my family. We left early in the morning to avoid heavy traffic and
            stopped twice for coffee and a short rest. The journey took about six
            hours, but it did not feel too tiring because we talked and listened to
            music. I also enjoyed watching the hills through the window as we got
            closer to the city."""),
            s("""People can make a long journey easier by planning a few simple
            things. First, they should bring water, light food and comfortable clothes.
            Regular breaks are useful because passengers can walk around and drivers
            can rest. Music, podcasts or a friendly conversation can make the time
            pass faster, although the driver must stay focused. It also helps to check
            the route and traffic before leaving, so unexpected delays cause less
            stress."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "How often do you watch films or programmes at home, and why?",
            "Which is better for learning, watching videos or reading? Why?",
        ),
        (
            s("""The picture shows a modern living room with a large television.
            Someone is holding a remote control and choosing from many films on the
            screen. There is a sofa, a small table and a plant, so the room looks
            comfortable and tidy. It is probably evening because the lights are on.
            The person may be deciding what to watch after work, and the wide choice
            suggests that an online film service is being used."""),
            s("""I watch a film or a short programme at home about three times a week.
            I usually choose comedy, travel shows or simple documentaries because they
            help me relax and sometimes teach me something new. Watching at home is
            convenient since I can pause the programme or make a drink whenever I
            want. However, I try not to watch for too long because I also need time
            for exercise, reading and sleep."""),
            s("""Both can support learning, but I think reading is better for deep
            study. A book or article lets me slow down, mark key points and return to
            a difficult idea. Videos are more helpful when I need to see a process,
            such as cooking a dish or using new software. Therefore, the best choice
            depends on the subject. If possible, I watch a short explanation first
            and then read more details afterwards."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "Do you often watch television? Why or why not?",
            "Why is free time important?",
        ),
        (
            s("""In the picture, a man is lying on a sofa and watching a large
            television. He has one arm behind his head and looks comfortable. The
            living room is bright, clean and simply decorated with plants and a small
            table. He may be relaxing after a busy day or watching a weekend sports
            programme. There is nobody else in the room, so he seems to be enjoying
            some quiet time on his own."""),
            s("""I do not watch traditional television very often, but I sometimes
            watch news or a football match with my family. Most days, I prefer short
            online programmes because I can choose the time and stop when I need to.
            Television is still useful for shared family entertainment, especially
            during an important event. Even so, I limit my screen time because sitting
            for many hours makes me feel tired and less active."""),
            s("""Free time is important because people need to recover from work or
            study. Without a proper break, it becomes harder to focus, and small
            problems can feel more stressful. In their free time, people can exercise,
            enjoy a hobby or meet someone they care about. These activities support
            both physical and mental health. A good balance also helps people return
            to their duties with more energy and often do better work."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "What do you usually read?",
            "Why is reading important for children?",
        ),
        (
            s("""The picture shows a mother, a father and their young son reading
            together outdoors. They are lying on the grass, and the mother is holding
            a colourful book. All three are smiling, so the story may be funny. The
            area is green and sunny, which makes the scene feel peaceful. The parents
            are close to the child and seem interested in the book, so this is also a
            warm moment of family time."""),
            s("""I usually read short news articles, travel stories and books about
            daily life. I often read on my phone when I travel by bus, but I prefer a
            paper book before bed because it helps me avoid the screen. If a book is
            too difficult, I choose an easier version instead of stopping completely.
            Reading for twenty minutes a day is enough for me to relax and learn new
            ideas at the same time."""),
            s("""Reading is important for children because it builds language,
            imagination and attention. Through stories, they meet new people and
            places without leaving home. They also learn how actions can have results,
            which helps them understand feelings and choices. When parents read with a
            child, they can explain unknown words and ask simple questions. This makes
            learning enjoyable and can create a habit that supports the child at
            school for many years."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "When was the last time you visited a new place?",
            "Why do people like visiting new places?",
        ),
        (
            s("""In this picture, a woman is carrying a small child through a green
            forest. The child is sitting on her shoulders and pointing at something
            among the trees. Both of them look interested and happy. They are wearing
            light outdoor clothes, so the walk may not be very difficult. The forest
            is thick and peaceful, and the woman is smiling as she looks in the same
            direction as the child."""),
            s("""The last new place I visited was a small village near Da Nang three
            months ago. A local friend took me there by motorbike and showed me a
            quiet beach, a market and a family restaurant. I had never heard of the
            village before, so everything felt fresh. The local people were friendly,
            and the seafood was excellent. I especially liked the slow pace because it
            was very different from my busy city life."""),
            s("""People like visiting new places because a change of scene can refresh
            the mind. They may see a different way of life, taste local food or learn
            about history. Travel also gives people stories and photos that they can
            share with family and friends. Some trips are challenging, but solving
            small problems can build confidence. Most importantly, a new place can
            help people look at their normal life from another point of view."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "Tell me about the last time you did some physical work.",
            "Do you think machines will do all hard work in the future? Why or why not?",
        ),
        (
            s("""The picture shows a man and a woman cleaning a living room together.
            The man is using a vacuum cleaner while the woman is putting rubbish into
            a large blue bag. A bottle and some paper are still on the floor, so they
            may be cleaning after a party. They are wearing casual clothes and appear
            to be working as a team. The room is bright, and they seem focused rather
            than unhappy."""),
            s("""Last weekend, I helped my parents move some furniture and clean their
            house. I carried boxes, moved a table and swept the floor. At first, the
            work felt tiring because the weather was hot, but we took short breaks and
            drank plenty of water. We finished before dinner, and the rooms looked much
            better. Although my arms were sore the next day, I was glad that I could
            help my family."""),
            s("""Machines will probably do more hard work in the future, especially
            work that is dangerous, heavy or repeated many times. This can protect
            workers and save time. However, I do not think machines will do everything.
            People are still needed to make decisions, solve unusual problems and care
            for others. Machines also need to be checked and repaired. In my view, the
            best future is one where technology supports people instead of fully
            replacing them."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "Tell me about a time you gave a presentation. How did you feel?",
            "Why are many people afraid of public speaking?",
        ),
        (
            s("""In the picture, a woman is giving a presentation to five colleagues
            in a meeting room. She is standing beside a large screen and pointing to a
            slide. The other people are sitting around a table with laptops and drinks.
            They appear to be listening carefully, and one person may be asking a
            question. The room looks modern and professional, so this is probably a
            work meeting about a new plan or product."""),
            s("""I gave a presentation at university last semester as part of a group
            project. My job was to explain our survey results for about five minutes.
            I felt nervous before I began, so I practised several times and wrote only
            key words on small cards. Once I saw that my classmates were listening, I
            became calmer. The teacher asked one question at the end, and I was pleased
            that I could answer it clearly."""),
            s("""Many people fear public speaking because they worry about making a
            mistake in front of others. They may forget a word, lose their place or
            think the audience will judge them. The body also reacts to stress, so
            their hands may shake and their voice may change. Careful practice can
            reduce this fear. Starting with a small, friendly group and using simple
            notes can slowly help a speaker become more confident."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "Tell me about the last time you went to the sea.",
            "Why do some people dislike going to the seaside?",
        ),
        (
            s("""The picture shows a woman standing on a boat near the sea at sunset.
            She is wearing a long white dress and looking towards the water. A city can
            be seen in the distance, while the sky and sea have warm golden colours.
            The woman appears calm, and the boat looks quiet rather than crowded. She
            may be enjoying the view at the end of a day trip or taking part in a
            special event."""),
            s("""The last time I went to the sea was during a family trip to Nha Trang
            last summer. We stayed for three days and went to the beach early each
            morning before it became too hot. I swam with my brother, tried fresh
            seafood and watched the sunset from the sand. One afternoon was rainy, so
            we visited a small museum instead. The trip was simple, but it helped all
            of us relax."""),
            s("""Some people dislike the seaside because it can be hot, crowded and
            noisy, especially during public holidays. Sand gets into clothes and bags,
            and strong sunlight can hurt the skin. People who cannot swim may also feel
            unsafe near deep water. In addition, a beach holiday is not relaxing for
            everyone. Some people prefer cool mountains or quiet forests, where they
            can walk in the shade and avoid large groups of tourists."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "Tell me about the last time you used public transport.",
            "How can cities encourage more people to use public transport?",
        ),
        (
            s("""In the picture, a man is standing on a train platform beside a modern
            red train. He is looking at his phone and carrying a brown shoulder bag, so
            he may be travelling to work. The station is bright and clean, and there
            are no large crowds around him. He appears calm, which suggests that he has
            enough time before the train leaves or before the doors open."""),
            s("""I used public transport yesterday when I took a bus to the city
            centre. I chose the bus because parking there is difficult and expensive.
            The journey took about thirty minutes, and I used the time to listen to an
            English podcast. The bus was a little crowded at first, but I found a seat
            after a few stops. Overall, it was cheap, safe and less stressful than
            driving through heavy traffic."""),
            s("""Cities can encourage public transport by making it reliable, clean
            and easy to use. Buses and trains should arrive often, and passengers need
            clear information about routes and times. A fair ticket price also matters,
            especially for students and daily workers. Safe stations, comfortable
            vehicles and links between different services can improve the whole trip.
            If public transport is faster and more convenient than driving, many
            people will choose it without being forced."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "Tell me about a time you laughed a lot.",
            "Do people from different countries laugh at different things? Why?",
        ),
        (
            s("""The picture shows a group of people watching a film in a cinema.
            They are sitting in red seats and holding popcorn and drinks. Several
            people are laughing, especially the young man in the centre, so the film
            is probably a comedy. The cinema is not full, and the audience looks
            relaxed. Some people are leaning towards their friends, which suggests
            that they are enjoying the film as a shared experience."""),
            s("""I laughed a lot at a friend's birthday dinner last month. After the
            meal, we looked at old school photos on a phone. Our clothes and hair
            looked very different, and each photo reminded us of a funny story. One
            friend copied the way our old teacher used to speak, and everyone started
            laughing. The jokes were simple, but they were special because we all
            shared the same memories and felt comfortable together."""),
            s("""Yes, people from different countries may laugh at different things
            because humour is linked to language, culture and shared experience. A
            play on words may be funny in one language but impossible to translate.
            Social rules also differ, so a joke that feels friendly in one place may
            feel rude in another. However, some humour is widely understood. Funny
            faces, small everyday mistakes and warm family stories can make people
            laugh almost anywhere."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "How do people learn to cook in your culture?",
            "Why is it important for people to learn to cook for themselves?",
        ),
        (
            s("""The picture shows a woman teaching four children how to cook. They
            are standing around a kitchen table with bowls, flour and other food.
            Each child is wearing an apron and appears to have a different task. The
            teacher is leaning forward to help them, and everyone looks interested.
            The room is bright and welcoming, so this may be a school activity or a
            weekend cooking class for young children."""),
            s("""In my culture, many people first learn to cook from parents or
            grandparents. Children watch how family meals are prepared and then help
            with easy jobs such as washing vegetables or mixing food. Later, they try
            a full dish by themselves. Today, videos and recipe websites are also very
            popular because each step is easy to follow. Some people take a class, but
            regular practice at home is still the most common way."""),
            s("""Learning to cook is important because it gives people more control
            over their health and spending. They can choose fresh food, use less sugar
            or salt and avoid buying expensive meals every day. Cooking also creates
            independence, especially for students who move away from home. It does not
            mean making difficult dishes; a few simple meals are enough to start.
            Sharing home-made food can also bring family and friends closer together."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "How do parents in your country care for their children?",
            "Why do parents care so deeply about their children?",
        ),
        (
            s("""In this picture, a father is helping his young son learn to ride a
            bicycle in a park. The boy is wearing a helmet, and the father is holding
            the back of the bike to keep him safe. Both are looking ahead and seem
            focused. The path is wide, and there are many green trees around them.
            This looks like a patient teaching moment as well as a pleasant activity
            for a parent and child."""),
            s("""In my country, parents usually care for their children in many ways.
            They provide food and a safe home, support their education and take them
            to the doctor when they are ill. Many parents also spend a lot of time
            giving advice and helping with school work. Some families are busy, so
            they may not play together every day. Even so, parents often make personal
            sacrifices to give their children better chances in life."""),
            s("""Parents care deeply because they feel a strong bond and a clear
            responsibility towards their children. Young children depend on adults for
            safety, guidance and emotional support. Parents also want to pass on useful
            values, such as kindness, honesty and hard work. Watching a child learn and
            become independent can bring great joy. Although good care takes time and
            energy, most parents feel that helping their child grow is one of their
            most important roles."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "How do children travel to school in your country?",
            "Is it common for children to live far from school in your country? Why?",
        ),
        (
            s("""The picture shows a group of primary school children getting onto a
            yellow school bus. They are walking in a line and carrying backpacks. An
            adult is standing near the bus door, probably to help them get on safely.
            The weather is sunny, and the bus has stopped on a quiet road. The
            children seem calm and organised, so this may be their normal trip to
            school in the morning."""),
            s("""Children in my country travel to school in several ways. Those who
            live nearby may walk or ride a bicycle, while many parents take younger
            children by motorbike or car. In larger cities, some private schools offer
            a school bus. Older students often use a public bus if the route is
            convenient. The choice usually depends on distance, traffic, the child's
            age and how much time the parents have in the morning."""),
            s("""It is common for some children to live far from a good school,
            especially in rural areas or when a family chooses a special private
            school. In city neighbourhoods, however, there are usually several schools
            within a reasonable distance. Long journeys can make children tired and
            reduce their free time. For this reason, many parents prefer a nearby
            school if it offers safe teaching and a suitable learning environment."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "Do you like dancing? Why or why not?",
            "On what occasions do people usually dance in your country?",
        ),
        (
            s("""The picture shows the same young man in three dancing positions
            against a plain background. He is wearing a colourful shirt, dark green
            trousers and sunglasses. His arms and legs are moving in different
            directions, and he has a cheerful expression. The simple background keeps
            all the attention on his movement. He may be making a dance video or
            showing the steps of a fun modern dance."""),
            s("""I like dancing, although I am not very skilled at it. I usually dance
            only when I am with close friends because I feel less worried about making
            mistakes. Moving to music is a good way to reduce stress and become more
            active. I do not try to learn difficult steps; I simply follow the rhythm
            and enjoy myself. For me, the main point is to have fun rather than to
            perform perfectly."""),
            s("""In my country, people often dance at weddings, birthday parties and
            music events. Traditional dances may be performed during cultural
            festivals, while younger people usually choose modern music at private
            parties or clubs. Some schools also include dance in performances at the
            end of the year. The style may change with the occasion, but dancing often
            helps a group celebrate, share energy and create a friendly atmosphere."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "Tell me about a game you played when you were a child.",
            "How have children's games changed in the last fifty years?",
        ),
        (
            s("""The picture shows three children playing with hoops in a park while
            two adults watch them. The children are standing on the grass and wearing
            bright summer clothes. They look active and happy, and each child is trying
            to keep a hoop moving around the body. The adults may be their parents or
            teachers. It is a sunny day, so this seems to be a simple outdoor game
            during a family or school activity."""),
            s("""When I was a child, I often played hide-and-seek with neighbours
            after school. One person counted beside a tree while the rest of us found
            places to hide around the yard. The game needed no equipment, so anyone
            could join. It also made us run, think quickly and work out where other
            children might be. I still remember it warmly because we laughed a lot and
            made friends in the neighbourhood."""),
            s("""Children's games have changed greatly because of technology and city
            life. In the past, children spent more time outdoors playing simple group
            games or using home-made toys. Today, many play on phones, computers or
            game machines, often with people online. Digital games can build some
            useful skills, but too much screen time reduces exercise and face-to-face
            contact. A healthy mix of modern games and outdoor play is probably the
            best choice."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "How do most people in your country learn about world news?",
            "How has news reporting changed in the last fifty years?",
        ),
        (
            s("""In the picture, a well-dressed man is reading a newspaper in a busy
            office or news studio. Behind him are several screens showing charts,
            reports and a television news presenter. A laptop is open on the desk.
            The man looks serious and focused, so he may work in business or the
            media. The mix of a printed paper and digital screens shows both old and
            modern ways of receiving information."""),
            s("""Most people in my country now learn about world news through online
            newspapers, news apps and social media. Television is still popular,
            especially with older family members, while radio is useful for drivers.
            I prefer a trusted news website because I can read the full report and
            compare it with another source. Social media is fast, but false information
            can spread easily, so people should check where a story came from before
            believing or sharing it."""),
            s("""Fifty years ago, news mainly came from printed newspapers, radio and
            a small number of television channels. Reports took longer to reach the
            public, and ordinary people had little chance to respond. Today, news can
            appear online within minutes, with live video, photos and comments.
            This speed is useful during an emergency, but it also creates pressure to
            publish before every fact is checked. Modern readers therefore need
            stronger skills for judging sources."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "Do you like climbing mountains? Why or why not?",
            "Do you think outdoor activities are important? Why?",
        ),
        (
            s("""The picture shows a small group of people climbing a rocky mountain.
            They are walking in a line and carrying backpacks, and one person is using
            a walking stick. The ground is dark and steep, while clouds and other
            mountains can be seen below them. Everyone is wearing warm outdoor
            clothing, so the air may be cold. The climb looks difficult, but the view
            is wide and impressive."""),
            s("""I enjoy easy mountain walks, but I am not ready for a very high or
            dangerous climb. I like the fresh air, quiet paths and the feeling of
            reaching a viewpoint after making an effort. However, safety is important,
            so I check the weather, wear suitable shoes and go with someone who knows
            the route. A well-planned walk makes me feel active and calm without taking
            an unnecessary risk."""),
            s("""Outdoor activities are important because they help people move their
            bodies, spend less time on screens and notice the natural world. A walk,
            bike ride or simple game can reduce stress and improve sleep. Group
            activities also give friends and families time to talk and work together.
            People do not need expensive equipment or extreme sports; even a regular
            walk in a local park can support both physical and mental health."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "Why is it important for adults to play with children?",
            "How should parents spend time with their children?",
        ),
        (
            s("""The picture shows a family relaxing together in a living room. The
            father is sitting at one end of the sofa with a laptop, while the mother is
            close to a young child who is lying under a blanket. The child is holding a
            soft toy and looks comfortable. The room is warm and bright. Although the
            parents may have some work to do, they are staying close to the child and
            sharing a quiet moment at home."""),
            s("""It is important for adults to play with children because play is one
            of the main ways children learn. A simple game can teach sharing, patience,
            language and problem-solving. When an adult joins in and listens, the child
            also feels noticed and safe. This can make it easier for the child to talk
            about worries later. In addition, playing together creates happy memories
            and gives adults a better understanding of the child's interests."""),
            s("""Parents should choose regular activities that fit the child's age and
            interests. They can read a story, cook a simple meal, play a game or go to
            a park. The activity does not need to cost much; the key point is giving
            full attention instead of checking a phone. Parents should also let
            children make small choices and speak freely. Even thirty focused minutes
            can be more valuable than several distracted hours together."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "Tell me about an animal that you like.",
            "How important are animals in our lives?",
        ),
        (
            s("""In the picture, a woman and a small child are riding a brown horse.
            The woman is sitting behind the child and holding the reins, so she is
            keeping the child safe. Both are wearing helmets. They are moving along a
            fenced path in a green outdoor area, and the horse looks calm. This may be
            the child's first riding lesson, and the woman appears to be guiding the
            experience carefully."""),
            s("""An animal I really like is the dog. Dogs can be friendly, active and
            very loyal to the people who care for them. My uncle has a small dog called
            Milo, and it always waits near the gate when he comes home. I enjoy taking
            Milo for a walk because it makes the walk more cheerful. However, owning a
            dog is a serious duty, since it needs food, exercise, training and regular
            health care."""),
            s("""Animals are important in many parts of life. Pets can offer company
            and help people feel less lonely. Farm animals provide food and support
            work in some communities, while wild animals help keep nature in balance.
            Some trained animals also assist people with disabilities or support rescue
            teams. Because humans affect their homes and safety, we have a duty to
            treat animals well and protect the places where wild species live."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "What are the benefits of outdoor activities?",
            "Why do many people enjoy outdoor activities?",
        ),
        (
            s("""The picture shows a father and his young son playing football in a
            park. The father is running towards the ball while the boy follows him.
            Both are wearing casual sports clothes and look full of energy. The grass
            is green, and there are trees in the background. No other players can be
            seen, so this may be a simple family game rather than a serious match.
            They seem to be enjoying their time together."""),
            s("""Outdoor activities benefit both the body and the mind. Walking,
            cycling or playing a game improves fitness and gives people a break from
            sitting indoors. Natural light and fresh air can also improve mood and
            sleep. When an activity is shared, it builds communication and teamwork.
            Another benefit is that many outdoor activities are free or low-cost, so
            people can protect their health without joining an expensive club."""),
            s("""Many people enjoy outdoor activities because they offer a change from
            work, traffic and screens. Nature often feels quieter than an office or a
            busy home, so people can think more clearly. Outdoor activities also give
            them small goals, such as reaching the end of a walking path or improving
            at a sport. The experience can be peaceful alone or social with others,
            which makes it suitable for many different personalities."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "How do parents in your country care for their children?",
            "Why is caring for children an important responsibility?",
        ),
        (
            s("""The picture shows a mother, a father and their daughter preparing food
            in a bright kitchen. The father is cutting vegetables, the girl is mixing
            something in a bowl, and the mother is helping beside her. Fresh vegetables
            cover the table, so they may be making a healthy family meal. Everyone is
            smiling and involved. The parents are not only cooking for the child but
            also teaching her a useful skill."""),
            s("""Parents in my country usually care for children by meeting their daily
            needs and guiding their development. They prepare meals, provide a safe
            home, support school work and teach polite behaviour. Many also take
            children to classes or sports activities when they can. Care is not only
            about money. Listening to a child's problems, spending time together and
            setting fair rules are equally important for healthy growth."""),
            s("""Caring for children is an important responsibility because early
            experiences can shape their health, confidence and behaviour for many
            years. Children need protection, but they also need chances to try things
            and learn from small mistakes. Good care gives them both support and
            growing independence. It also benefits society: children who feel safe and
            learn respect are more likely to become responsible adults who care about
            other people."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "Tell me about the last time you shopped in a local store.",
            "Why do many people like shopping online nowadays?",
        ),
        (
            s("""In the picture, a woman is shopping in a supermarket. She is pushing
            a trolley filled with vegetables and looking at products in a chilled
            section. She is wearing casual clothes, and the shop is clean, bright and
            well organised. There are many items to choose from, so she may be checking
            prices or reading labels before deciding. She appears calm, which suggests
            that the supermarket is not too crowded."""),
            s("""I shopped at a small local grocery store yesterday evening. I needed
            eggs, fruit and milk for breakfast, and the store is only a five-minute
            walk from my home. The owner knows many people in the area and helped me
            find a fresh box of eggs. The prices were slightly higher than at a large
            supermarket, but the visit was quick and friendly. I also liked supporting
            a small local business."""),
            s("""Many people like shopping online because it saves travel time and
            offers a wide choice. They can compare prices, read reviews and order at
            any hour. Home delivery is especially useful for busy workers, older
            people or anyone buying a heavy item. However, online shopping also has
            risks, such as unclear quality or late delivery. People should use trusted
            sellers and avoid buying things simply because an advert makes them look
            cheap."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "Do you prefer reading the news or watching it? Why?",
            "Why do people need to follow the news?",
        ),
        (
            s("""The picture shows a television interview taking place outdoors. A
            female reporter is holding a microphone and speaking to a man in a suit.
            A camera operator is filming them from the side. The man may be an expert,
            a business leader or a public official. They are standing near a modern
            building, and everyone looks serious. This is probably a news report about
            a local event or an important decision."""),
            s("""I prefer reading the news because I can move at my own speed and
            return to an important point. Written reports often include links,
            numbers and background information that are hard to remember from a short
            video. I still watch live news during a major event because the pictures
            make the situation clearer. Usually, I read one or two trusted websites
            and compare them instead of depending on a single social media post."""),
            s("""People need to follow the news so they can understand events that may
            affect their work, safety or community. Local reports can warn people about
            weather, traffic or changes in public services, while world news shows how
            countries are connected. News also helps citizens make informed choices.
            However, following every update can create stress. A balanced habit is to
            check reliable sources once or twice a day and avoid unconfirmed stories."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "What do you think about living in a crowded city?",
            "Why do many people dislike crowded places?",
        ),
        (
            s("""The picture shows a very busy city street full of people. The crowd is
            moving between tall buildings, and the road appears to be closed to cars.
            Some people are carrying bags, so the area may be a shopping street at the
            end of the workday. The light is warm, but the scene still feels noisy and
            active. It could be exciting for a visitor, although moving through such a
            large crowd might be tiring."""),
            s("""Living in a crowded city has both good and bad sides. There are often
            more jobs, schools, hospitals and forms of entertainment, and public
            transport can be convenient. On the other hand, housing is expensive,
            traffic is heavy and quiet space is limited. I could live in a city for
            work, but I would choose a calm neighbourhood near a park. That would give
            me access to city services without constant noise."""),
            s("""Many people dislike crowded places because they feel they have little
            personal space or control. Noise, heat and slow movement can quickly cause
            stress, and people may worry about losing a bag or becoming separated from
            friends. Crowds are also difficult for parents with young children and for
            people who cannot walk easily. Some enjoy the energy of a busy event, but
            others recover best in quiet places with fewer people."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "Tell me about the last time you went on holiday with someone else.",
            "What are the benefits of spending time with other people?",
        ),
        (
            s("""The picture shows a young woman sitting by a window on a public bus.
            She is wearing headphones and looking outside with a gentle smile. Several
            other passengers are sitting behind her, but the bus is not crowded. Sunlight
            is coming through the window, and the woman has a bag beside her. She may
            be travelling to another part of the city or beginning a longer journey
            for work, study or a holiday."""),
            s("""The last holiday I took with someone else was a short trip to Hoi An
            with my sister. We travelled by train and stayed in a small guest house for
            two nights. We walked around the old town, tried local food and rented
            bicycles one morning. When it rained, we changed our plan and visited a
            café. Travelling together was helpful because we shared costs, took photos
            for each other and solved small problems as a team."""),
            s("""Spending time with other people can reduce loneliness and create a
            sense of support. Friends and family give us a chance to talk, laugh and
            see a problem from another point of view. Shared activities also build
            trust and memories. Of course, people need some time alone as well, and
            social plans should not become a duty. A healthy balance allows someone to
            enjoy close relationships while still resting and thinking independently."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "Tell me about a time you gave or received a gift.",
            "On what occasions do people give gifts in your country?",
        ),
        (
            s("""The picture shows a young girl giving a small gift to a woman, who may
            be her mother. The girl is standing behind the sofa and covering the
            woman's eyes with one hand. The woman is holding a white box and smiling,
            so she is clearly pleased by the surprise. The room looks warm and
            comfortable. This may be a birthday, Mother's Day or simply a kind family
            moment with no special occasion."""),
            s("""Last month, I gave my best friend a simple photo book for her birthday.
            I chose pictures from our school years and added a short message beside
            each one. It took time to prepare, but it did not cost very much. She was
            surprised and spent a long time looking through it during the party. I felt
            happy because the gift showed that I remembered our shared experiences,
            rather than being something chosen in a hurry."""),
            s("""In my country, people commonly give gifts for birthdays, weddings,
            the Lunar New Year and important family celebrations. Flowers or small
            presents may also be given to teachers, hosts or someone who is ill.
            The value is usually less important than the thought behind it. However,
            the type of gift should suit the relationship and occasion. A useful or
            personal present, offered politely, is often remembered more warmly than
            an expensive but careless one."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "Have you ever written a letter by hand?",
            "Do you plan to write handwritten letters in the future? Why or why not?",
        ),
        (
            s("""In the picture, a middle-aged man is writing by hand at a desk in his
            home. A laptop is open beside him, and there is a cup near his notebook.
            Behind him are shelves filled with books. The room is quiet and bright,
            so he may be writing a personal letter, making study notes or planning
            some work. He looks focused and has chosen paper even though a computer is
            available."""),
            s("""Yes, I have written letters by hand. The last one was a thank-you
            letter to a teacher who helped me prepare for an important exam. I wanted
            the message to feel more personal than a quick text. I first wrote a rough
            version, then copied it carefully onto a small card. My handwriting was
            not perfect, but the teacher appreciated the time and thought that I had
            put into it."""),
            s("""I plan to write handwritten letters on special occasions, although I
            will still use email for daily communication. A handwritten message feels
            personal because the writer has taken time to choose the words and create
            a physical object. It can also be kept for many years. However, letters are
            slow when information is urgent. For that reason, I would use them for
            thanks, birthdays or close relationships rather than practical work
            messages."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "What are the benefits of looking at works of art?",
            "Why do people like going to art exhibitions?",
        ),
        (
            s("""The picture shows a group of visitors in a modern art gallery. They
            are standing in front of several large paintings with simple black shapes.
            Some people are talking in pairs, while others are looking closely at the
            work. The room has white walls and plenty of light, which allows the art
            to stand out. The visitors are dressed casually, so this may be a public
            exhibition during a normal afternoon."""),
            s("""Looking at art can help people slow down, notice details and think in
            a different way. A painting may show an emotion or idea that is difficult
            to explain in ordinary words. Art also teaches us about another time,
            place or culture. Even when viewers do not understand everything, they can
            discuss what they see and compare opinions. This supports imagination and
            reminds people that one subject can have more than one meaning."""),
            s("""People like art exhibitions because they can see real works in a
            shared space rather than only on a phone. The size, colour and surface of
            a painting often feel different in person. Exhibitions also offer a quiet
            social activity where friends can talk and learn together. Some visitors
            go for a famous artist, while others are simply curious. A clear guide or
            short explanation can make the experience welcoming even for beginners."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "Tell me about the last time you went shopping.",
            "Why do some people dislike busy places?",
        ),
        (
            s("""The picture shows three young women walking together in a shopping
            area. They are wearing light casual clothes and appear to be talking and
            smiling. Shops, trees and other people can be seen behind them. None of the
            women is carrying many bags, so they may have just started shopping or may
            simply be meeting for a walk. The area is active but not extremely crowded,
            and the weather looks warm and pleasant."""),
            s("""The last time I went shopping was on Saturday morning. I needed a
            comfortable pair of shoes for work, so I visited a shopping centre near my
            home. I tried three pairs and chose a simple black one that was within my
            budget. The centre became crowded around lunchtime, so I paid and left
            instead of visiting more shops. Planning exactly what I needed helped me
            finish quickly and avoid buying unnecessary things."""),
            s("""Some people dislike busy places because noise, queues and constant
            movement make them tired. It can be hard to think clearly or speak to a
            friend when many people are close by. Busy places also increase waiting
            time, and there is a greater chance of losing something. People who prefer
            calm spaces may shop early or use online services. This is not unfriendly;
            they simply feel better when their surroundings are more controlled."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "Tell me about the last time you went shopping.",
            "Why do many people enjoy shopping with friends?",
        ),
        (
            s("""The picture shows a young couple standing outside a clothing shop.
            They have their arms around each other and are looking at clothes displayed
            behind the window. Both are dressed casually and seem relaxed. The shop is
            bright and modern, and several outfits are shown on models. They may be
            deciding whether to go inside, or they may be choosing something for a
            special event together."""),
            s("""I went shopping with my cousin last week because I needed a shirt for
            a family wedding. We visited two stores and compared several colours and
            prices. My cousin suggested a light blue shirt that I would not have chosen
            alone, but it fitted well and matched my trousers. Afterwards, we had
            coffee nearby. The trip took longer than shopping alone, yet her honest
            advice helped me make a better choice."""),
            s("""Many people enjoy shopping with friends because they can ask for an
            honest opinion and share the experience. A friend may notice whether
            something fits well or find a better price. Shopping together can also
            become a social day with lunch or coffee. However, different tastes can
            slow down a decision, so friends should respect each other's budget and
            choices. When there is no pressure, company can make an ordinary task more
            enjoyable."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "What do you usually eat for breakfast?",
            "Is it important to eat a good breakfast? Why?",
        ),
        (
            s("""The picture shows a father and his young son having breakfast in a
            bright kitchen. The boy is holding a spoon and smiling at his father.
            There are bowls, milk, juice and some fruit on the table, so the meal looks
            simple and healthy. Both are wearing casual clothes and seem to be enjoying
            a relaxed conversation. This may be a weekend morning because they do not
            appear to be in a hurry."""),
            s("""I usually eat a light but filling breakfast. On working days, I have
            bread or oats with an egg, a banana and a cup of coffee. If I have more
            time at the weekend, I may eat noodle soup with my family. I try to prepare
            a few things the night before because mornings can be busy. This simple
            routine gives me energy without making me feel too full."""),
            s("""A good breakfast is important for many people because the body has had
            no food for several hours. A balanced meal can improve energy and make it
            easier to focus at work or school. However, breakfast does not need to be
            large or expensive. Fruit, eggs, bread or oats can be enough. People have
            different routines, but regularly replacing breakfast with only a sweet
            drink may lead to hunger and poor concentration later."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "What do you do to relax?",
            "Why is it important for people to relax?",
        ),
        (
            s("""The picture shows a young girl lying on the grass and listening to
            music through headphones. Her eyes are closed, and one arm is behind her
            head, so she looks peaceful. She is wearing a colourful summer dress, and
            the sunlight is soft. No other people or buildings can be seen. She may be
            resting in a garden or park and enjoying a quiet break outdoors."""),
            s("""To relax, I usually take a short walk without checking my phone. I
            choose a quiet street or park and focus on the trees and people around me.
            If the weather is bad, I make tea and listen to calm music at home.
            These activities are simple, but they help my mind move away from work.
            I also try to sleep at a regular time because rest is harder when I am
            already very tired."""),
            s("""Relaxation is important because the mind and body cannot work well
            without a break. Long periods of stress can reduce focus, disturb sleep
            and affect relationships. A short rest helps people manage emotions and
            return to a task with clearer thinking. Relaxing does not always mean doing
            nothing; exercise, music or a hobby can also help. The best method is one
            that is healthy, regular and suitable for the individual."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "Tell me about a time you gave or received flowers.",
            "On what occasions do people give flowers in your country?",
        ),
        (
            s("""The picture shows a young boy giving a bunch of red and yellow flowers
            to a woman, who may be his mother. He is holding the flowers behind his
            back as if he wants to surprise her. The woman is sitting on a sofa and
            smiling widely. The room is bright and comfortable, and the moment feels
            warm and personal. It may be Mother's Day, her birthday or simply an act
            of thanks."""),
            s("""I received flowers from my colleagues when I completed my first year
            at a new job. They gave me a small bunch after our weekly meeting and wrote
            kind messages on a card. I had not expected anything, so I felt surprised
            and appreciated. I kept the flowers on my desk for several days. The gift
            was not expensive, but it reminded me that the team had noticed my effort
            and welcomed me."""),
            s("""In my country, people often give flowers on birthdays, weddings,
            graduation days and special days for women or teachers. Flowers are also
            used to welcome a guest, thank someone or visit a person who is ill.
            Different colours may carry different meanings, so people sometimes choose
            carefully. Although flowers do not last forever, they can express warmth
            without many words and make an ordinary room or moment feel special."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "Tell me about the last time you looked closely at a work of art.",
            "Why do people enjoy creating art?",
        ),
        (
            s("""The picture shows an artist painting a landscape in a studio. He is
            wearing a hat and holding a brush beside a large canvas. The painting
            includes mountains, trees and water, and several other pictures are
            hanging around the room. Paints and tools cover the table. The artist looks
            focused and is adding a small detail, so the work may be nearly finished
            after many hours of careful effort."""),
            s("""The last time I looked closely at art was during a free exhibition at
            my local library. One painting showed a rainy city street at night. From a
            distance it looked simple, but up close I could see many small colours in
            the lights and water. I read the short note beside it and then discussed it
            with a friend. The experience helped me notice how much planning can be
            hidden inside one picture."""),
            s("""People enjoy creating art because it gives them a way to express an
            idea, memory or feeling. The process can be calm and rewarding, even if the
            final work is not perfect. Art also allows people to play with colour,
            sound, shape or movement and develop a personal style. Some artists want
            to share a message, while others create simply for pleasure. In both cases,
            making something can build patience and confidence."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "Why is it important for adults to read and play with children?",
            "How can busy parents spend useful time with their children?",
        ),
        (
            s("""The picture shows a mother and her young daughter reading a book
            together in bed or on a large sofa. The child is resting against her
            mother, and both are looking at the same page. They are smiling, so the
            story may be funny or interesting. The room is soft and comfortable, which
            suggests that this could be part of their bedtime routine. It is a quiet
            moment of learning and closeness."""),
            s("""Reading and playing with children support both learning and emotional
            growth. Stories build language and imagination, while games teach skills
            such as sharing, planning and waiting for a turn. More importantly, a child
            receives full attention and feels safe enough to ask questions. Adults also
            learn what the child enjoys or worries about. These simple activities can
            therefore strengthen trust while helping the child develop useful skills."""),
            s("""Busy parents can create short, regular routines instead of waiting for
            a completely free day. They might read for fifteen minutes before bed,
            prepare dinner together or walk to a nearby shop. During that time, putting
            the phone away is important. Parents can also involve children in ordinary
            tasks and let them talk about their day. A small amount of focused time,
            repeated often, usually feels more meaningful than a rare expensive trip."""),
        ),
    ),
    (
        (
            "Describe the picture.",
            "Do you like visiting exhibitions? Why or why not?",
            "What can teachers do to help young people enjoy exhibitions?",
        ),
        (
            s("""The picture shows several visitors looking at modern paintings in an
            art gallery. The works use simple dark shapes on light backgrounds, and the
            walls are plain white. Some visitors are talking, while others are standing
            quietly and studying a picture. The group includes both younger and older
            adults. The gallery feels calm and open, so people can move slowly and give
            each work their full attention."""),
            s("""Yes, I like visiting exhibitions when the subject interests me. I
            enjoy seeing real objects or pictures because their size and detail are
            clearer than on a screen. An exhibition also gives me a reason to slow down
            and learn something outside my usual routine. I do not understand every
            work of art, but short explanations help. Going with a friend is useful
            because we often notice different things and can compare opinions."""),
            s("""Teachers can make exhibitions enjoyable by preparing students before
            the visit. They can introduce the main topic, explain a few key words and
            give each student a simple question to explore. During the visit, young
            people should have time to choose what interests them instead of copying
            long notes. A small photo task, group discussion or creative activity
            afterwards can help them connect the exhibition to their own lives and
            remember it better."""),
        ),
    ),
]


PART3_SETS = [
    (
        ("Describe and compare the two pictures.", "What are the benefits of travelling by car and by train?", "Why do some people prefer travelling by train?"),
        (
            s("""Both pictures show people travelling, but the journeys are different. In the first picture, a young couple is sitting in the front of a car and smiling, so they may be enjoying a private road trip. In the second, four passengers are talking around a table on a train. Car travel offers more privacy and control over stops, whereas the train gives passengers space to move and talk without anyone in the group needing to drive."""),
            s("""Travelling by car is flexible because people can leave when they want, choose their route and stop at small places. It is useful for families carrying bags or visiting areas without public transport. A train, however, can be more relaxing on a long trip because passengers can read, work or sleep. Trains may also carry many people with less road traffic. The better choice depends on the route, cost and number of travellers."""),
            s("""Some people prefer trains because they do not have to focus on driving or look for parking. They can stretch their legs, use a table and enjoy the view through a large window. Train times are often clear, and a central station may be convenient. Although delays can happen and tickets are not always cheap, many passengers feel safer and calmer on a train, especially when the road journey would be long or crowded."""),
        ),
    ),
    (
        ("Describe and compare the two pictures.", "Do you prefer playing chess or playing video games? Why?", "Are outdoor activities important? Why?"),
        (
            s("""The pictures show two types of game. In the first, two children are sitting opposite each other and playing chess on a board. They look calm and thoughtful. In the second, a girl and a boy are holding controllers and playing a video game at home. They look excited and may be reacting quickly to the screen. Chess is slower and has clear traditional rules, while video games are more active and use digital images and sound."""),
            s("""I prefer chess because it helps me slow down and plan before making a choice. A game can be played anywhere with one other person, and there are always new ways to improve. Video games can also be fun, especially when friends work together online, but I sometimes lose track of time in front of a screen. For that reason, chess suits me better, although I would still enjoy an occasional video game with friends."""),
            s("""Outdoor activities are important because children and adults spend a large part of the day sitting and looking at screens. Walking, cycling or playing a sport supports fitness, sleep and a healthy mood. Outdoor time also gives people direct contact with nature and chances to meet others. Indoor games still build useful skills, so they should not disappear. A balanced routine with both quiet games and regular outdoor movement is the healthiest choice."""),
        ),
    ),
    (
        ("Describe and compare the two pictures.", "Would you rather visit a pine forest or a beach? Why?", "Does weather affect people's emotions? Why?"),
        (
            s("""The first picture shows a quiet pine forest beside a lake or mountain view. The light is warm, and the area feels cool and peaceful. The second picture shows a bright tropical beach with blue water, white sand and palm trees. Both places are natural and attractive, but they offer different experiences. The forest is better for walking in the shade, whereas the beach is suited to swimming, sunbathing and enjoying a wide open view."""),
            s("""I would rather visit the pine forest because I enjoy cool air, quiet paths and the smell of trees. I could walk, take photos and sit by the water without becoming too hot. A beach is beautiful and offers more water activities, but it can be crowded and the strong sun makes me tired. However, I would choose the beach for a family trip if the children wanted to swim and play in the sand."""),
            s("""Weather can affect emotions because it changes light, temperature and what people are able to do. A bright, mild day often makes it easier to go outside and feel active. Long periods of heat, rain or dark skies may reduce energy and change plans, which can be disappointing. Still, weather is not the only influence. Good company, enough sleep and enjoyable indoor activities can help people stay positive even when conditions outside are poor."""),
        ),
    ),
    (
        ("Describe and compare the two pictures.", "What are the main differences between these two sports?", "Why are some sports more popular or important than others?"),
        (
            s("""Both pictures show athletes in a large stadium. In the first, several football players are competing for the ball during a team match. In the second, one athlete is jumping over a high bar in an individual event. Football requires passing, shared plans and constant contact with other players. High jump depends more on personal technique, speed and careful timing. Both need training, but one is a long team game while the other is a short individual performance."""),
            s("""Football and high jump differ in team size, movement and scoring. Footballers work together for a full match and score by putting the ball into a goal. A high jumper performs alone and tries to clear a bar at a greater height. Football includes changing situations and direct competition, while high jump repeats one focused skill. Even so, both sports require fitness, practice, confidence and the ability to perform well under pressure."""),
            s("""Some sports become more popular because they are easy to play, widely shown on television or connected to national success. Football needs only a ball and an open space, so many children can start it. Other sports may require special equipment or facilities, which limits access. A sport can also feel important when it brings a community together or encourages health. Popularity does not mean one sport has more value for every person."""),
        ),
    ),
    (
        ("Describe and compare the two pictures.", "Do you prefer studying in a library or in a coffee shop? Why?", "What difficulties can people face when studying in these two places?"),
        (
            s("""The pictures show people studying in two public places. In the first, three students are sitting together in a library with books and a tablet. They seem to be discussing their work. In the second, one man is studying alone at a coffee shop with a laptop, notebooks and a drink. The library offers books and a quiet academic setting, while the caf? feels more casual but may include music, customers and other distractions."""),
            s("""I prefer studying in a library because the quiet setting helps me focus for a longer time. I can use books, find a large table and work without feeling that I must buy anything. A coffee shop is pleasant for a short task or a friendly group meeting, and a drink can help me feel relaxed. However, noise and people moving around easily take my attention away, so I choose the library for serious study."""),
            s("""A library can be too quiet for group discussion, and seats or useful books may not be available during busy periods. Its opening hours can also be limited. In a coffee shop, background music, conversations and the sound of machines can make concentration difficult. Customers may have small tables and need to keep buying drinks. Both places can work well, but students should choose based on the task and their own ability to ignore distractions."""),
        ),
    ),
    (
        ("Describe and compare the two pictures.", "Do you prefer living with family or living alone? Why?", "Why do many people choose to live alone nowadays?"),
        (
            s("""The first picture shows a family of five sitting together on the grass in front of a large house. They are smiling and seem close. The second picture shows a young woman standing alone on a small city balcony. She looks calm and independent. Family life may offer company, shared costs and daily support, whereas living alone gives a person more privacy and control. The first setting feels social and spacious, while the second feels private and urban."""),
            s("""At this stage of my life, I prefer living with family because we can share meals, housework and daily costs. It is also comforting to have someone nearby when a problem occurs. However, family members need to respect each other's space and routines. I understand why living alone is attractive, and I may choose it for a period in the future, but at present the support and company of family matter more to me."""),
            s("""Many people choose to live alone because they work or study far from their family and want independence. They can arrange the home, invite friends and follow a routine without asking anyone else. Smaller households are also more accepted than in the past. However, living alone can be expensive and sometimes lonely. Online contact, convenient services and active social groups make it easier, but people still need supportive relationships outside the home."""),
        ),
    ),
    (
        ("Describe and compare the two pictures.", "What is interesting about these two traditional ways of travelling?", "Should animals be used for transport? Why or why not?"),
        (
            s("""Both pictures show transport that depends on animals. In the first, a person is riding a camel across a dry desert. In the second, a driver is sitting on a carriage pulled by two horses in a town. The camel suits hot, sandy land and carries one rider, while the carriage can carry several people on a road. These forms of travel are slower than modern vehicles, but they connect visitors with local history and traditional ways of life."""),
            s("""Camel riding can give travellers a close view of a desert and show how people once crossed difficult land. A horse carriage offers a slow tour of a town and lets passengers notice buildings without walking far. Both can feel special because they are different from everyday transport. However, the experience is only positive if the animals are healthy, well trained and allowed enough rest, water and suitable working hours."""),
            s("""Animals should be used for transport only under strict care and in limited situations. In some rural areas, they may still support families where roads or machines are not available. For tourism, the animal's health should come before profit. Heavy loads, extreme heat and long hours are unacceptable. If a safe vehicle can do the same job, it is often the better choice. Tradition is valuable, but it does not excuse poor treatment."""),
        ),
    ),
    (
        ("Describe and compare the two pictures.", "Do you like interacting with animals? Why or why not?", "Should children learn about animals through direct experience?"),
        (
            s("""The pictures show children learning about animals in different ways. In the first, an adult is holding a young child near a white horse outdoors. In the second, a group of children is sitting around a table and carefully touching a snake with a teacher. The horse experience is one-to-one and active, while the snake activity is a guided group lesson. Both give children a close view that they could not get from a book alone."""),
            s("""I like interacting with calm animals when a trained person is present. Feeding a horse or playing with a friendly dog can be relaxing and helps me understand the animal's behaviour. However, I do not approach an unknown animal because it may feel afraid or react suddenly. I am less comfortable with snakes, but I would still observe one in a safe lesson. Respect and safety are more important than forcing a close experience."""),
            s("""Children should have safe direct experiences with animals because they can learn care, patience and respect for living things. Seeing how an animal moves and responds makes a lesson memorable. However, a trained adult must choose a suitable animal, explain clear rules and allow a child to step back if afraid. Direct contact should support, not replace, books and videos. Together, these methods can build knowledge without harming either the child or the animal."""),
        ),
    ),
    (
        ("Describe and compare the two pictures.", "What are the difficulties of these two sports?", "Why do some people prefer team sports to individual sports?"),
        (
            s("""Both pictures show demanding outdoor sports. In the first, one person is cycling quickly along a road and wearing a helmet. In the second, a team is rowing a long boat together on open water. Cycling can be done alone and depends on balance, road safety and personal effort. Rowing requires every person to move at the same time and follow a shared rhythm. One athlete controls the first sport, whereas close teamwork controls the second."""),
            s("""Road cycling is difficult because a rider must manage speed, balance, traffic and changing weather for a long period. A small mistake can be dangerous, so protective equipment and attention are essential. Rowing is physically tiring and also demands perfect timing across the whole team. Wind and water conditions add another challenge. Both sports require strong fitness, but rowing includes communication and shared movement while cycling places more responsibility on one person."""),
            s("""Some people prefer team sports because success and pressure are shared. Teammates can encourage one another, use different strengths and celebrate together. Training also becomes a social event, which helps people stay motivated. Individual sports offer freedom and clear personal goals, but they can feel lonely when progress is slow. A team is especially attractive to people who enjoy communication and feel more confident when others are working towards the same result."""),
        ),
    ),
    (
        ("Describe and compare the two pictures.", "What kinds of people might enjoy visiting these places?", "Which place would you rather visit, and why?"),
        (
            s("""The first picture shows a person walking alone through a dark green forest. Tall trees surround a narrow path, and the place looks cool and quiet. The second picture shows several people riding camels across bright desert sand. The forest offers shade and plant life, while the desert is open, dry and much hotter. Both trips bring people close to nature, but they require different clothes, preparation and ways of travelling."""),
            s("""The forest may suit people who enjoy walking, wildlife and quiet natural spaces. It can also be a good choice for families if the path is safe and not too difficult. The desert is likely to attract adventurous travellers who want a new culture, wide views and a more unusual journey. However, they need to handle heat and strong sunlight. Neither place is ideal for someone who dislikes changing weather or being far from city services."""),
            s("""I would rather visit the forest because I prefer cool shade and green scenery. I could walk at a comfortable speed, listen to birds and take photos of plants. A desert trip looks exciting, and riding a camel would be memorable, but high temperatures make me tired. I would still visit a desert once with an experienced guide. For a longer or repeated holiday, though, the peaceful forest would be a safer and more relaxing choice for me."""),
        ),
    ),
    (
        ("Describe and compare the two pictures.", "What are the benefits of indoor and outdoor sports?", "Do you think the main purpose of playing a game is to win? Why or why not?"),
        (
            s("""Both pictures show people playing sport on courts. In the first, two wheelchair basketball teams are competing indoors, and one player is shooting the ball. In the second, two older adults are shaking hands across a tennis net outdoors. The basketball game looks fast and highly competitive, while the tennis scene appears friendly and relaxed after a match. Both show that sport can include different ages and physical abilities when suitable rules and facilities are available."""),
            s("""Indoor sports can continue in rain or strong heat, and the playing surface is usually controlled and safe. They are convenient for evening training, although halls may cost money and feel crowded. Outdoor sports provide fresh air, natural light and often more open space. However, weather can cancel a match or make conditions unsafe. Both forms improve fitness and social contact, so having access to a mix gives people more choice throughout the year."""),
            s("""Winning is an important goal because it gives a game direction and encourages players to make an effort. However, it should not be the only purpose. Sport also improves health, teaches rules and helps people manage both success and disappointment. If players care only about the result, they may act unfairly or stop enjoying the activity. A strong player tries to win while still respecting opponents, learning from mistakes and supporting the team."""),
        ),
    ),
    (
        ("Describe and compare the two pictures.", "What are the benefits of supermarkets and traditional markets?", "Why do some people dislike going shopping?"),
        (
            s("""The pictures show two places where people buy food. In the first, a family is choosing products in a bright supermarket with organised shelves and fixed prices. In the second, sellers are sitting among baskets of fresh vegetables at a colourful outdoor market. The supermarket is cleaner and easier to move through, while the traditional market feels more local and personal. Both offer choice, but the shopping experience and contact with sellers are quite different."""),
            s("""Supermarkets offer many products in one place, clear labels, regular opening hours and payment by card. Customers can compare packaged items and shop in comfort. Traditional markets often provide very fresh local food and direct contact with the person selling it. Prices may be flexible, and the market supports small businesses. A supermarket is convenient for a long list, whereas a market can be better for seasonal food and a stronger community feeling."""),
            s("""Some people dislike shopping because it takes time, involves queues and forces them to make many small choices. Busy shops can feel noisy, and carrying bags is difficult without a car. Others worry about spending more than planned or do not enjoy comparing prices. Online services reduce some of these problems, although customers cannot always check quality. A clear list, a quiet shopping time and a set budget can make the task easier."""),
        ),
    ),
    (
        ("Describe and compare the two pictures.", "Which of these two places would you prefer to visit? Why?", "Who is each type of trip most suitable for?"),
        (
            s("""Both pictures show families enjoying natural places. In the first, a group is hiking on a high rocky mountain above the clouds. They are wearing outdoor clothes and carrying bags. In the second, a family is walking on a sunny beach in matching shirts. The mountain trip looks cool, difficult and adventurous, while the beach holiday looks warm, easy and relaxed. Each offers beautiful views and family time, but the level of effort is very different."""),
            s("""I would prefer the beach for a short family holiday because everyone could join, including young children and older relatives. We could swim, walk on the sand and rest whenever we wanted. The mountain view is more dramatic, and reaching the top would feel rewarding, but the climb requires training and careful planning. I would choose it for a trip with active friends, while the beach would be easier for a mixed family group."""),
            s("""A mountain hike suits healthy adults or older children who enjoy challenge, exercise and changing weather. They need suitable shoes, supplies and sometimes an experienced guide. A beach holiday is suitable for a wider range of people because activities can be gentle or active. Families can swim, play or simply sit in the shade. However, people who dislike heat or cannot swim may prefer the mountain. Safety and personal interest should guide the choice."""),
        ),
    ),
    (
        ("Describe and compare the two pictures.", "Where would you prefer to play music, and why?", "How can playing music in different places create different emotions?"),
        (
            s("""The pictures show music being played in two very different settings. In the first, a child is learning keyboard indoors while an adult plays guitar beside her. The lesson feels quiet and personal. In the second, a band is performing on an outdoor stage in front of a large crowd. That scene feels public, loud and full of energy. Both involve live instruments, but one focuses on learning and close support, while the other focuses on entertainment and shared excitement."""),
            s("""I would prefer to play music at home or in a small room because I could concentrate and make mistakes without feeling embarrassed. A few friends could join, so the experience would still be social. Performing on a large stage might be exciting, but the crowd and sound equipment would make me nervous. If I became more skilled, I might try a small public event first and slowly build confidence before facing a large audience."""),
            s("""A place changes how music feels because of its size, sound and audience. Music in a quiet room can feel close and emotional, especially when only family or friends are present. At an outdoor festival, the same song may feel powerful because thousands of people move and sing together. Natural sounds, lighting and the time of day also shape the mood. Musicians often change their style and energy to fit the space around them."""),
        ),
    ),
    (
        ("Describe and compare the two pictures.", "Do you like going to crowded beaches? Why or why not?", "Why do many people like quiet places?"),
        (
            s("""Both pictures show people spending time near water, but the atmosphere is completely different. The first beach is packed with visitors, bright umbrellas and city buildings. It looks hot, noisy and active. In the second, two people are sitting beside a calm mountain lake with almost nobody around. The view is cool, green and peaceful. The crowded beach offers more social energy, whereas the quiet lake gives visitors privacy and closer contact with nature."""),
            s("""I do not enjoy a very crowded beach because it is hard to find space, watch personal items and hear the people I am with. Long queues and loud music also make the trip less relaxing. I like a beach with some caf?s and safety services, but I would visit early in the morning or outside the main holiday season. That way, I can still swim and enjoy the sea without feeling surrounded by a large crowd."""),
            s("""Many people like quiet places because they offer a break from traffic, work messages and constant conversation. In a calm setting, people can think, read or talk to someone without rushing. Natural places may also reduce stress and help the body slow down. This does not mean they dislike other people. After spending a busy day with others, a period of quiet can restore energy and make future social contact more enjoyable."""),
        ),
    ),
    (
        ("Describe and compare the two pictures.", "Why do some people prefer travelling by plane to travelling by train?", "Why does flying make some people uncomfortable?"),
        (
            s("""Both pictures show people waiting for long-distance transport. In the first, a traveller with a suitcase is looking through an airport window at a plane. In the second, a man is standing on an underground or train platform as a train arrives. Air travel is suited to very long distances and involves more security, while train travel is easier to enter and often reaches a city centre. Both require passengers to follow fixed times and carry their luggage."""),
            s("""People often choose planes because they can cross a country or ocean much faster than trains. This saves valuable time for a short holiday or an urgent business trip. Flights also connect places that have no direct rail route. Although airports involve security checks and travel from the city, the total journey may still be shorter. Price differences have also become smaller on some routes, especially when tickets are booked early."""),
            s("""Flying makes some people uncomfortable because they fear heights, changes in air pressure or the idea of having no control. Airport checks, delays and crowded seats can add stress. Others feel physically unwell during take-off or when the plane moves in rough air. Clear information and calm staff can help. Passengers may also choose an aisle seat, breathe slowly and avoid too much coffee before the flight."""),
        ),
    ),
    (
        ("Describe and compare the two pictures.", "What are the benefits of growing a garden?", "Why do many people enjoy growing vegetables and flowers?"),
        (
            s("""The pictures show people working in home gardens. In the first, a woman is picking red tomatoes from healthy plants and placing them in a basket. In the second, a father and young child are planting or watering flowers together beside a house. The first garden focuses on producing food, while the second also creates family time and a beautiful outdoor space. Both activities require regular care, patience, sunlight and attention to the seasons."""),
            s("""A garden can provide fresh food, gentle exercise and a pleasant break from indoor work. Growing vegetables allows people to see how their food is produced and may reduce shopping costs during the right season. Flowers make a home more attractive and support insects such as bees. Gardening also teaches patience because results take time. For children, it is a practical way to learn about nature and responsibility."""),
            s("""Many people enjoy growing plants because caring for something and watching it change brings a clear sense of progress. The work is quiet and uses the hands, so it can reduce stress after a day on a computer. Gardeners can also share food, flowers and advice with neighbours. There are challenges, such as bad weather or insects, but solving them is part of the interest. Even a small balcony pot can offer this experience."""),
        ),
    ),
    (
        ("Describe and compare the two pictures.", "How are people enjoying music in these two pictures?", "What are the benefits of listening to music?"),
        (
            s("""The pictures show two ways of enjoying music. In the first, a woman is sitting alone on a sofa with headphones, smiling and moving her arms. She is listening privately at home. In the second, a singer and band are performing live on a stage in front of an outdoor crowd. That experience is public and shared. Headphones offer comfort and personal choice, whereas a concert adds live sound, visual performance and energy from other people."""),
            s("""The woman at home can choose any song, control the volume and listen whenever she wants. She may dance or relax without worrying about other people. At the concert, listeners see the musicians directly and share the moment with a large crowd. The sound and atmosphere are stronger, although tickets can be costly and the event may be crowded. Both ways are enjoyable because they meet different needs at different times."""),
            s("""Listening to music can improve mood, reduce stress and make everyday tasks feel easier. A calm song may help someone rest, while a faster one can support exercise. Music also connects people to memories, languages and cultures. When friends share songs or attend a concert, it creates a topic for conversation and a sense of belonging. However, volume should be safe, especially through headphones, so enjoyment does not damage hearing."""),
        ),
    ),
    (
        ("Describe and compare the two pictures.", "Do you prefer playing chess or playing video games? Why?", "Are indoor activities important? Why?"),
        (
            s("""The first picture shows a family playing chess together at a table. The parents are helping a young child, so the game is also a learning activity. The second picture shows a boy playing a video game alone with a controller. He is focused on a screen that we cannot see. Both are indoor games that need thinking, but chess creates face-to-face family contact, while the video game offers digital action and can be played independently."""),
            s("""I prefer chess because each move gives me time to think and understand another person's plan. It also allows conversation during the game and needs no screen or internet. Video games can develop quick reactions and may include creative stories, but I find it easy to play for too long. I would choose chess for regular free time and keep video games as an occasional activity with friends, so I can enjoy both without losing balance."""),
            s("""Indoor activities are important because weather, health or location can sometimes keep people at home. Reading, games, cooking and crafts help them learn, relax and spend time with others. These activities are also useful in the evening when outdoor areas may be unsafe or closed. However, indoor time should include movement and breaks from screens. A balanced week needs quiet indoor interests as well as fresh air and physical exercise."""),
        ),
    ),
    (
        ("Describe and compare the two pictures.", "Why is eating in these two places appealing?", "Where do people in your country like to eat on special occasions?"),
        (
            s("""Both pictures show people preparing to enjoy food, but the settings are different. In the first, a father is cooking a meal with two children in a home kitchen. The activity feels warm, active and shared. In the second, a man is eating pizza alone at an outdoor caf?. He looks relaxed and has no cooking or cleaning to do. Home food offers family involvement, while a restaurant provides convenience, a change of scene and professional service."""),
            s("""Eating at home is appealing because people can choose ingredients, control the cost and create a comfortable family routine. Cooking together can also be enjoyable and teaches useful skills. A caf? or restaurant is attractive when people want to rest, try a dish that is hard to make or meet without preparing the house. The better setting depends on time and purpose: home suits regular connection, while eating out can make a day feel different."""),
            s("""On special occasions, many people in my country choose a restaurant with a private table or room for the family. It is convenient for birthdays and graduation meals because nobody must cook for a large group. Weddings often take place in event halls, while smaller celebrations may happen at home with traditional dishes. People usually choose based on budget, group size and the needs of older relatives or young children."""),
        ),
    ),
    (
        ("Describe and compare the two pictures.", "Do you prefer living with family or living alone? Why?", "Why do many people choose to live alone nowadays?"),
        (
            s("""The first picture shows parents and two children sitting on the lawn outside a large family house. They look cheerful and close. The second picture shows a young woman standing alone on an apartment balcony in a city. She appears confident and relaxed. Living with family offers daily company, shared space and support, whereas living alone offers privacy and freedom. The family home is larger, but the apartment may be nearer to work and city services."""),
            s("""I prefer living with family because shared meals and small daily conversations make the home feel warm. We can divide bills and housework, and it is easier to help one another during a busy or difficult time. The challenge is that everyone has different habits, so clear rules and private space are needed. Living alone would give me more control, but I would miss the regular support and company that I have now."""),
            s("""Many people live alone because jobs and education take them away from their hometown, or because they want to become more independent. Modern technology makes it easy to order services and stay in contact, while smaller homes are available in many cities. Social views have also changed, so living alone is less unusual. Still, high rent and loneliness can be serious problems, which is why friendships and community activities remain important."""),
        ),
    ),
    (
        ("Describe and compare the two pictures.", "Do you like interacting with animals? Why or why not?", "Should children have safe contact with animals? Why?"),
        (
            s("""Both pictures show children meeting animals under adult guidance. In the first, a man is holding a young child beside a calm horse in a field. In the second, several school children are touching a snake on a table while wearing masks. The horse meeting looks informal and outdoors, whereas the snake activity looks like an organised lesson. Both can build knowledge and confidence, but the type of animal requires different safety rules and levels of care."""),
            s("""I enjoy being near friendly animals because their behaviour is interesting and often calming. I am comfortable with dogs, cats and horses when the owner or trainer says it is safe. I would be more careful around a snake because I do not know how to read its behaviour. In every case, I approach slowly and never force contact. An animal is not a toy, so its comfort matters as much as the visitor's experience."""),
            s("""Children should have safe contact with animals because it teaches empathy, responsibility and respect for nature. A direct meeting can make information from a book feel real and memorable. However, an adult must explain how to behave, supervise closely and choose animals that are calm and properly cared for. Children should also be allowed to watch from a distance if afraid. The aim is gentle learning, not a brave-looking photo or forced touch."""),
        ),
    ),
    (
        ("Describe and compare the two pictures.", "What are the difficulties of these two sports?", "Why do some people prefer team sports to individual sports?"),
        (
            s("""The pictures show a cyclist racing alone on a road and a group rowing a boat through rough water. Both sports need strength and balance, but the working style is different. The cyclist controls speed, direction and decisions independently. In the boat, every rower must move together and listen to instructions. Cycling takes place near traffic and hard ground, while rowing involves waves and water. The first depends on personal rhythm; the second depends on a shared one."""),
            s("""A cyclist must maintain balance, watch the road and manage energy over a long distance. Wind, heat and passing vehicles can make the sport dangerous. Rowers face changing water and need enough strength to repeat the same movement. Their biggest challenge is keeping the whole team at the same speed and timing. Safety equipment matters in both sports. Physical fitness is essential, but rowing adds the extra difficulty of constant teamwork."""),
            s("""Some people prefer team sports because other players provide support, advice and motivation. A difficult training session feels easier when everyone shares the effort. Team members also develop communication and learn to trust different strengths. Individual sport offers more control and makes progress easy to measure, but the athlete carries pressure alone. People who enjoy shared goals and social contact often find a team more rewarding and are more likely to continue training."""),
        ),
    ),
    (
        ("Describe and compare the two pictures.", "What do you think about these two types of trip?", "What are the advantages and disadvantages of comfortable travel and adventure travel?"),
        (
            s("""The first picture shows a couple pulling suitcases through a bright airport, probably before a planned flight. The second shows one traveller standing in a wild mountain area under dark clouds and taking a photo. The airport trip looks organised, comfortable and connected to transport services. The mountain trip looks independent, physical and affected by weather. Both can lead to new places, but one focuses on an easy journey while the other makes challenge part of the experience."""),
            s("""A planned flight is useful for reaching a distant city quickly and comfortably. Travellers can book hotels and transport in advance, although airport checks and delays may cause stress. An adventure trip offers close contact with nature and a strong sense of achievement, but it demands fitness, equipment and careful safety planning. I would choose the first for a short family holiday and the second with experienced friends when I had enough time to prepare."""),
            s("""Comfortable travel reduces physical effort and uncertainty, so it suits families, older people and anyone with limited time. Its disadvantages are cost, crowds and a journey that may feel less personal. Adventure travel builds confidence and creates unusual memories, while often bringing people closer to nature. However, bad weather, injury or poor planning can become serious. Neither style is always better; the right balance depends on health, experience, budget and the purpose of the trip."""),
        ),
    ),
    (
        ("Describe and compare the two pictures.", "How might the experience of travelling in these two vehicles differ?", "Why do people still choose to own a car?"),
        (
            s("""The first picture shows passengers getting onto an older public bus, while the second shows a man standing proudly beside a red private car. The bus carries many people and follows a fixed route, so it is cheaper but offers less privacy. The car looks fast, comfortable and available at any time, although only a few people can travel in it. Public transport shares space and cost; private transport gives the owner more choice and control."""),
            s("""On a bus, passengers do not need to drive and can rest or look outside, but they must follow the timetable and may stand in a crowd. A private car offers a chosen route, air conditioning and room for personal bags. It is easier for a family or a trip with several stops. However, the driver must deal with traffic, parking and fuel costs. The bus is more social and affordable, while the car is more private and flexible."""),
            s("""People still own cars because they need reliable travel at times or places where public transport is weak. A car is convenient for taking children to school, carrying shopping or visiting relatives outside the city. It also provides privacy and protection from bad weather. However, ownership is expensive and adds to traffic and pollution. Better buses and trains can reduce unnecessary driving, but they must be safe, frequent and connected before many families can depend on them completely."""),
        ),
    ),
]
def p4(
    title: str,
    question1: str,
    question3: str,
    story: str,
    reflection: str,
    wider_view: str,
) -> dict[str, str]:
    return {
        "title": title.split(" (", 1)[0],
        "question1": question1,
        "question2": "How did you feel, and what did you learn from this experience?",
        "question3": question3,
        "story": s(story),
        "reflection": s(reflection),
        "wider_view": s(wider_view),
    }


def make_part4_answer(spec: dict[str, str]) -> str:
    story = " ".join(split_sentences(make_easier(spec["story"]))[:4])
    reflection = " ".join(split_sentences(make_easier(spec["reflection"]))[:2])
    wider_view = " ".join(split_sentences(make_easier(spec["wider_view"]))[:3])
    paragraphs = [
        "First, " + lower_first(story),
        reflection,
        "In general, " + lower_first(wider_view),
    ]
    return "\n\n".join(paragraphs)


PART4_SPECS = [
    p4(
        "Saving money for a goal (Ti?t ki?m ti?n cho m?t m?c ti?u)",
        "Tell me about a time you saved money to do something.",
        "Why is saving money useful, and how can people do it successfully?",
        "Last year, I wanted to buy a laptop for my studies, but I did not want to borrow money. I set a six-month goal and wrote down every expense. I cooked at home more often, stopped buying drinks on the way to class and saved a fixed amount as soon as I was paid. Some weeks were difficult, but I finally had enough money and bought the laptop during a sale.",
        "At first, I felt limited because I had to say no to small things I enjoyed. Later, each month of progress made me more confident. I learned that a clear goal and regular small actions are more useful than one big promise.",
        "saving gives people security and choice. An emergency becomes less frightening, and a planned purchase does not create unnecessary debt. People can start by recording expenses, choosing a realistic amount and moving it into a separate account. They should still allow a little money for enjoyment, because a plan that is too strict is hard to continue. Regular habits matter more than saving a large amount once.",
    ),
    p4(
        "Asking a good question (??t m?t c?u h?i hay)",
        "Tell me about a time you asked a useful question.",
        "Why is asking good questions important at school and at work?",
        "During a university class, our teacher explained a difficult part of a group project. Most students were quiet, but I did not understand how our work would be marked. I asked whether we could see a simple example and which part was most important. The teacher gave a clear explanation and showed us a short model. Several classmates later told me that they had been confused about the same point.",
        "I was nervous because I did not want to look unprepared. When the teacher answered kindly, I felt relieved and glad that I had spoken. I learned that a short, clear question can help a whole group, not only the person who asks it.",
        "good questions prevent mistakes and lead to deeper understanding. They help a speaker see what needs more explanation and allow a team to make better decisions. Before asking, people should listen carefully, think about the exact point and use simple words. There is no shame in not knowing something. In fact, polite curiosity often shows responsibility and can save time later.",
    ),
    p4(
        "Reading a good book (??c m?t cu?n s?ch hay)",
        "Tell me about a time you read a good book.",
        "Why are books still valuable when so much information is online?",
        "Two years ago, a friend gave me a short book called The Little Prince. I first expected it to be only a children's story, but I read it during a quiet weekend and found many ideas about friendship, care and growing up. The language was simple, so I could focus on the meaning. After finishing it, I called my friend, and we talked about the parts that affected us differently.",
        "I felt calm while reading and thoughtful afterwards. The story reminded me not to judge people too quickly and to give time to the relationships I value. I learned that a simple story can carry an important message without using difficult words.",
        "books give readers time to follow an idea without constant messages or short videos. A full story develops attention, imagination and understanding of other people's feelings. Online information is useful for speed, but books often offer a more complete experience. People do not need to read long or serious works; choosing an enjoyable book and reading a few pages regularly can create a lasting habit.",
    ),
    p4(
        "Seeing a work of art (Xem m?t t?c ph?m ngh? thu?t)",
        "Tell me about a time you went to see a work of art.",
        "Why should people have access to art in public places?",
        "Last summer, I visited a small art gallery with my sister while we were in Da Nang. One painting showed fishermen returning home before a storm. From far away, it looked dark and simple, but close up I could see many small colours in the sea and sky. We read the artist's note and spent several minutes discussing what the people in the boat might have been feeling.",
        "I felt surprised because one picture made me stop and think for much longer than I expected. I learned to look carefully before deciding that art is difficult or uninteresting. Sharing different ideas with my sister also made the visit more enjoyable.",
        "public art gives everyone a chance to experience creativity, including people who cannot pay for a private event. It can make a station, park or hospital more welcoming and can tell stories about local history. Clear signs and free guided activities help beginners. People do not need expert knowledge; they only need time, curiosity and the freedom to form their own view.",
    ),
    p4(
        "Choosing between many options (C? nhi?u l?a ch?n)",
        "Tell me about a time you had many options to choose from.",
        "How can people make a good decision when there are many choices?",
        "When I finished secondary school, I had to choose between several university courses. I was interested in business, languages and information technology, and each option had a different cost and job path. I listed what I enjoyed, spoke to two current students and attended open days with my parents. After comparing the course content rather than only the school names, I chose business with extra English classes.",
        "At first, I felt confused and afraid of closing the door on other choices. The research made me calmer because my decision was based on clear reasons. I learned that no option is perfect, but a thoughtful choice can still be right for the current stage of life.",
        "people should begin by deciding which two or three factors matter most, such as cost, safety or long-term value. They can collect enough information, set a deadline and ask advice from people with real experience. Too many opinions can create more confusion, so the final decision should match the person's own goals. After choosing, it is better to act and adjust later than to worry forever.",
    ),
    p4(
        "Working in a team (L?m vi?c nh?m)",
        "Tell me about a time you worked in a team.",
        "What makes teamwork successful?",
        "Last semester, four classmates and I prepared a presentation about healthy city transport. We divided the research, but at first our slides looked completely different. I suggested one simple design and a shared online folder. We then met twice to check facts, remove repeated points and practise the speaking parts. On presentation day, one member forgot a sentence, so another member calmly helped. We finished on time and received good feedback.",
        "I felt some pressure when our work did not fit together, but the clear plan changed the mood. I was proud that we supported one another instead of blaming anyone. I learned that teamwork needs both personal responsibility and regular communication.",
        "successful teams agree on one goal, divide tasks fairly and make deadlines visible. Members should speak honestly about problems early and listen to different ideas. A leader can organise the work, but should not control every detail. Trust grows when each person completes a task and offers help when needed. Teams are strongest when success belongs to everyone and mistakes become shared lessons.",
    ),
    p4(
        "Trying an extreme sport (Th? m?t m?n th? thao m?o hi?m)",
        "Tell me about a time you tried an extreme or challenging sport.",
        "Why do people choose activities that involve risk?",
        "During a trip to Da Lat, my friends invited me to try a supervised climbing course. It was not a very high mountain, but I had to wear a safety belt and climb a steep rock wall. An instructor checked the equipment and explained each step. My legs shook at the beginning, so I moved slowly and listened carefully. After several attempts, I reached the top platform and came down safely.",
        "I felt frightened at first because I was far above the ground. When I focused on one step at a time, the fear became manageable. I learned that courage does not mean feeling no fear; it means preparing well and acting carefully despite it.",
        "some people enjoy controlled risk because it breaks their routine and tests their limits. Reaching a difficult goal can build confidence and create a strong memory. However, excitement should never replace safety. People need trained guides, correct equipment, honest information about their health and the right weather. Choosing a smaller challenge is sensible, and nobody should be forced to join simply to impress friends.",
    ),
    p4(
        "Exploring a forest (Kh?m ph? m?t khu r?ng)",
        "Tell me about a time you explored a forest.",
        "Why is it important to protect forests and visit them responsibly?",
        "Last year, I joined three friends on a guided walk through a forest in a national park. We started early, carried water and followed a marked path. The guide showed us unusual plants, bird sounds and signs left by small animals. At one point, light rain made the ground slippery, so we slowed down and helped one another. We reached a waterfall before lunch and returned without leaving any rubbish behind.",
        "I felt peaceful because the forest was far from traffic and phone messages. I also felt responsible when I saw how easily a careless visitor could damage plants. I learned to prepare for weather changes and to follow local rules even on an easy walk.",
        "forests protect water, soil, animals and the climate, while also giving people space to learn and rest. Visitors should stay on paths, keep noise low, carry rubbish out and never feed wild animals. Tourism can support local jobs, but only if numbers and activities are managed. Protecting a forest is not against enjoyment; it makes sure future visitors can enjoy the same place.",
    ),
    p4(
        "Achieving an important goal (??t ???c m?t m?c ti?u)",
        "Tell me about a time you achieved something important.",
        "How can people stay motivated while working towards a long-term goal?",
        "An achievement I remember clearly was passing an English exam after six months of preparation. I studied for forty minutes most evenings, recorded my speaking and asked a friend to correct my writing. My first practice results were low, so I changed the plan and focused on my weakest parts. On the result day, I opened the email with my family and saw that I had reached the level I needed for work.",
        "I felt relieved, proud and thankful for the people who supported me. The result mattered, but the steady routine changed my confidence even more. I learned that weak early results are useful information, not proof that a goal is impossible.",
        "long-term motivation becomes easier when a large goal is divided into small weekly actions. People should track progress, celebrate simple improvements and change a method that is not working. Support from a friend or teacher also creates responsibility. Motivation naturally rises and falls, so a regular schedule is more reliable than waiting to feel excited every day. Rest is part of the plan, not a sign of failure.",
    ),
    p4(
        "Learning a new skill (H?c m?t k? n?ng m?i)",
        "Tell me about a time you learned a new skill.",
        "What is the best way for adults to learn a practical skill?",
        "I learned basic cooking when I moved away from my family for work. At first, I could only make eggs and simple noodles. I chose five easy dishes, watched short videos and cooked one of them each weekend. I made mistakes, such as using too much salt, but I wrote down what to change. After two months, I could prepare a healthy dinner for friends without needing to check every step.",
        "I felt clumsy at the beginning, but each small success made the task more enjoyable. Cooking for other people gave me real confidence. I learned that practice and useful feedback are more important than trying to look skilled from the first day.",
        "adults learn practical skills best when they have a clear reason, start with a small task and practise often. Watching an explanation is useful, but real progress comes from doing the activity and correcting mistakes. A patient teacher or friend can prevent unsafe habits. Learners should compare themselves with their own earlier work, not with experts online, because skill grows slowly through repeated use.",
    ),
    p4(
        "Receiving good news (Nh?n tin t?t)",
        "Tell me about a time you received good news.",
        "Why do people like sharing good news with others?",
        "A few months ago, I was waiting to hear whether I had been accepted for a new job. The interview had gone well, but the company took two weeks to decide. One afternoon, I received an email offering me the position and a clear start date. I read it twice to make sure I had understood. Then I called my parents and thanked the friend who had helped me practise for the interview.",
        "During the wait, I felt nervous and checked my email too often. The good news brought relief as well as excitement about a new stage. I learned to be patient after doing my best and to remember the people who support me.",
        "sharing good news allows happiness to grow and helps close relationships feel stronger. Family and friends often understand the effort behind a result, so their reaction has special meaning. People should still be thoughtful about time and context, because someone else may be facing a difficult moment. A warm message, a call or a small meal together can celebrate success without turning it into a competition.",
    ),
    p4(
        "Helping someone (Gi?p ?? m?t ng??i)",
        "Tell me about a time you helped someone.",
        "Why is everyday help important in a community?",
        "Last winter, an older neighbour had to carry several heavy food bags from the street to her apartment. I saw her struggling as I came home, so I offered to help. I carried the bags upstairs, placed them in her kitchen and checked that she did not need anything else. We talked for a few minutes, and she later brought my family some fruit as a thank-you, although I had not expected a gift.",
        "I felt useful and also a little sorry that I had not spoken to her more often. The task took less than ten minutes but clearly mattered to her. I learned that helpful actions do not need to be large or carefully planned.",
        "everyday help creates trust and makes a neighbourhood safer and friendlier. People may need support because of age, illness, a busy period or a simple unexpected problem. Offering politely is important, since not everyone wants help in the same way. Communities become stronger when people notice one another, share small skills and also feel comfortable asking for support when their own turn comes.",
    ),
    p4(
        "Visiting an amusement park (?i c?ng vi?n gi?i tr?)",
        "Tell me about a time you went to an amusement park.",
        "Why are amusement parks popular with families and friends?",
        "Two years ago, I went to an amusement park near Ho Chi Minh City with three cousins. We arrived early, bought a day ticket and began with gentle rides. Later, they persuaded me to try a large roller coaster. I checked the safety bar several times and shouted through most of the ride, but I was laughing when it ended. We also watched a water show and shared snacks before going home.",
        "I felt nervous before the fast ride and excited afterwards. The day reminded me that a safe new experience can be more enjoyable when shared with people I trust. I also learned to take breaks instead of trying every activity at once.",
        "amusement parks place many forms of entertainment in one safe, organised area. Different rides, shows and food choices allow a mixed group to find something suitable. They also create strong shared memories because the setting feels different from daily life. However, tickets and food can be expensive, and long queues reduce enjoyment. Clear prices, safety checks, shade and activities for different ages make a park much more welcoming.",
    ),
    p4(
        "Wanting to buy something but being unable to (Mu?n mua nh?ng ch?a th? mua)",
        "Tell me about a time you wanted to buy something but could not.",
        "How can people manage the difference between wants and needs?",
        "When my old phone began to slow down, I wanted to buy the newest model. I visited a shop and liked its camera, but the price was much higher than my monthly budget. Instead of using credit, I replaced the battery in my current phone and removed unused files. It then worked well enough for another year. By the time I truly needed a new one, a suitable model was available at a lower price.",
        "I first felt disappointed because advertising had made the new phone seem necessary. After solving the real problem cheaply, I felt sensible and relieved. I learned to wait before a large purchase and ask what I actually need the item to do.",
        "people can separate wants from needs by considering use, urgency and cost. A need supports health, work or basic daily life, while a want may simply add comfort or status. Waiting a few days, checking alternatives and setting a spending limit can prevent regret. Enjoying a planned purchase is fine, but borrowing for every new product creates stress and reduces freedom later.",
    ),
    p4(
        "Being in a hurry (V?i v? l?m m?t vi?c)",
        "Tell me about a time you had to hurry.",
        "Why do people often rush, and how can they avoid it?",
        "One Monday morning, I woke up late because my phone had not charged and the alarm did not ring. I had an important meeting at eight thirty. I washed, dressed and packed my bag in less than fifteen minutes, then booked a motorbike taxi instead of taking the bus. I sent my manager a short message and arrived only five minutes late. Fortunately, I had prepared my documents the night before.",
        "I felt stressed and embarrassed because other people were waiting. I also noticed that rushing made it easier to forget simple things. I learned to use a second alarm, charge my phone away from the bed and allow extra travel time for important events.",
        "people rush because they plan too much, underestimate travel time or delay starting an unpleasant task. Unexpected problems then remove the small amount of time left. A realistic schedule, early preparation and clear priorities can reduce this pressure. It is also useful to leave space between activities. Moving quickly is sometimes necessary, but constantly rushing harms attention, safety and health.",
    ),
    p4(
        "Laughing with a friend (C??i th?t nhi?u v?i m?t ng??i b?n)",
        "Tell me about a time you laughed a lot with a friend.",
        "How does humour support friendships and well-being?",
        "Last month, my school friend visited me, and we looked through old class photos after dinner. We found one picture from a school play in which both of us wore costumes that were much too large. He copied the serious voice he had used on stage, and I could not stop laughing. We then remembered several small mistakes from that day and told the stories to my sister, who laughed with us.",
        "I felt light and close to my friend because the memory belonged to both of us. The laughter removed the stress of a busy week. I learned that happy moments do not require an expensive plan; shared history and relaxed company can be enough.",
        "humour helps friends manage stress, recover from small problems and communicate warmly. A kind joke can make a difficult conversation easier and remind people not to take every mistake too seriously. However, humour should not target someone's weakness or ignore their feelings. The best laughter is shared, not used against another person. When people feel safe, humour can strengthen trust and make time together memorable.",
    ),
    p4(
        "Facing a difficult question (G?p m?t c?u h?i kh?)",
        "Tell me about a time you faced a difficult question.",
        "What should people do when they do not know an answer?",
        "During a job interview, the manager asked me to describe a mistake I had made and what I learned from it. I had expected questions about my strengths, so I needed a few seconds to think. I chose a real example about missing a small deadline, explained the cause and described the checklist I now use. I did not try to look perfect. The manager asked one follow-up question and seemed satisfied with the honest answer.",
        "At first, I felt uncomfortable and worried that the example would harm my chance. Speaking calmly made me feel more in control. I learned that a difficult question often tests honesty and thinking, not only knowledge.",
        "when people do not know an answer, they should pause, make sure they understand the question and state what they do know. It is better to ask for time or admit uncertainty than to invent facts. At school or work, they can explain how they would find reliable information. Honest limits build more trust than confident guessing, especially when a decision may affect other people.",
    ),
    p4(
        "Taking a holiday (C? m?t k? ngh?)",
        "Tell me about a holiday you remember well.",
        "Why are holidays important, and what makes them enjoyable?",
        "Last summer, my family spent three days in Hoi An. We travelled by train, stayed in a small guest house and explored the old town mostly on foot. One morning, we rented bicycles and rode through nearby fields. Heavy rain changed our evening plan, so we ate at a simple family restaurant and played cards inside. The trip was not perfect, but everyone was flexible and we had time to talk without work or study.",
        "I felt relaxed and grateful because my family rarely has the same free days. The unexpected rain became part of the memory instead of ruining it. I learned that good company and a flexible plan matter more than seeing every famous place.",
        "holidays give people time to rest, strengthen relationships and experience a change from normal duties. They do not need to be long or expensive. Clear budgeting, a few shared interests and enough free time make a trip enjoyable. Planning is useful, but a full schedule can create new stress. A good holiday balances activity with rest and respects the needs of everyone in the group.",
    ),
    p4(
        "Making a great effort (N? l?c r?t nhi?u)",
        "Tell me about a time you made a great effort.",
        "When is hard work worthwhile, and when should people change their plan?",
        "In my final year at university, I had to complete a research report while working part-time. For six weeks, I followed a weekly plan and used early mornings for reading. I met my teacher twice to fix weak parts and asked a classmate to check my charts. Near the deadline, I wanted to remove an important section, but I reduced my work hours for a few days and finished it carefully. The report received a strong result.",
        "I often felt tired, but the clear progress kept me going. Finishing the report brought pride and relief. I learned that great effort works best when it has structure, feedback and a clear end, rather than simply working longer every night.",
        "hard work is worthwhile when the goal matters, progress is possible and the cost to health remains reasonable. People should review results instead of repeating the same method. If effort produces no improvement, advice or a new plan may be needed. Rest is not laziness; it protects the quality of later work. Persistence and flexibility should support each other.",
    ),
    p4(
        "Working with older people and children (L?m vi?c v?i ng??i gi? v? tr? em)",
        "Tell me about a time you worked with both older people and children.",
        "How can activities bring different generations together?",
        "I once volunteered at a community day where older residents taught children simple traditional games. My role was to prepare materials, introduce each group and help anyone who found the instructions difficult. At first, the children were impatient and some older people spoke very softly. We formed smaller groups, and the activity soon became lively. By the end, the children were teaching one game back to the adults and everyone was smiling.",
        "I felt busy but encouraged because the two age groups became comfortable with one another. I learned to give clear instructions, listen patiently and adjust the pace. Different generations may communicate differently, but shared activity can quickly create respect.",
        "intergenerational activities allow older people to share experience and feel connected, while children gain stories, patience and practical knowledge. Good programmes should use simple tasks, small groups and a safe pace for everyone. Neither age group should be treated as helpless. When each person has something to give, the meeting feels like a real exchange rather than a one-way service.",
    ),
    p4(
        "Facing a challenge (??i m?t v?i m?t th? th?ch)",
        "Tell me about a challenge you have faced.",
        "How can challenges help people grow?",
        "A challenge I faced was moving to another city for my first full-time job. I did not know the bus routes, my room was small and I missed my family. During the first month, I made a simple routine, joined lunch with colleagues and called home at set times instead of whenever I felt lonely. I also explored one new area each weekend. After three months, the city felt much more familiar.",
        "At first, I felt excited and worried at the same time. Small successes, such as finding my way or making a friend, slowly built confidence. I learned that adjustment takes time and that asking for local advice is a practical strength, not a weakness.",
        "challenges can reveal skills that people did not know they had and teach them how to solve problems. Growth is more likely when the challenge is difficult but still safe and when support is available. People should divide it into smaller steps and notice progress. They do not need to face every problem alone, and changing direction can sometimes be the wisest response.",
    ),
    p4(
        "Going through a busy time (Tr?i qua m?t th?i gian b?n r?n)",
        "Tell me about a busy time in your life.",
        "How can people stay healthy and organised during busy periods?",
        "The busiest period I remember was the month before my university graduation. I had final exams, a group report and a part-time job. I wrote every deadline on one page and chose three main tasks for each day. I also told my manager which exam days I could not work. I sometimes studied with friends, but we kept the meetings short and focused. Everything was completed, although the month passed very quickly.",
        "I felt pressure and sometimes became impatient over small problems. The daily list stopped me from thinking about every task at once. I learned to communicate early, protect my sleep and accept that some unimportant activities could wait.",
        "busy people need clear priorities, realistic schedules and basic health habits. Regular meals, enough water, short movement breaks and sleep support better work than endless late nights. Tasks can be divided, delayed or shared, but deadlines should not be ignored. It also helps to turn off unnecessary messages during focused time. A busy period should have an end and be followed by recovery.",
    ),
    p4(
        "Visiting a new city (Th?m m?t th?nh ph? m?i)",
        "Tell me about a time you visited a new city.",
        "What is the best way to learn about a city for the first time?",
        "I first visited Hue with two friends during a three-day holiday. We arrived by train in the morning and left our bags at a small hotel. Instead of rushing, we walked beside the river, visited the old royal area and tried a local noodle dish. The next day, a student guide explained several historical sites and recommended a quiet market. We also used a public bicycle service, which helped us see ordinary neighbourhoods.",
        "I felt curious because the city was calmer and more historical than the place where I live. Talking to a local guide made the buildings more meaningful. I learned that a new city is not only a list of famous sights; daily food, transport and conversations also tell its story.",
        "first-time visitors should combine basic planning with room for discovery. Learning a little history, marking a few important places and understanding local transport prevents stress. Walking, using public transport and speaking respectfully with local people reveal more than staying inside a tour bus. Visitors should also follow local rules and avoid trying to see everything, because a slower trip often creates clearer memories.",
    ),
    p4(
        "Meeting a new friend (G?p m?t ng??i b?n m?i)",
        "Tell me about a time you met a new friend.",
        "How do adult friendships begin and stay strong?",
        "I met a close friend during an evening English class two years ago. We sat beside each other because the other seats were full. During a speaking task, we discovered that we worked near the same area and both liked badminton. After class, we shared a bus stop and agreed to practise together once a week. The study meetings later became coffee chats and weekend games, and we continued meeting after the course ended.",
        "I felt slightly shy at first, but the shared task made conversation easy. I was pleased that a simple seat choice led to a real friendship. I learned that friendship often grows from small repeated contact rather than one perfect first meeting.",
        "adult friendships usually begin through work, study, hobbies or mutual friends. They stay strong when both people make time, listen without judging and keep promises. Frequent messages are not always necessary, but honest contact and shared experiences matter. Adults are busy, so planning a regular activity can help. A healthy friendship also allows differences and does not demand attention every day.",
    ),
    p4(
        "Receiving a meaningful gift (Nh?n m?t m?n qu?)",
        "Tell me about a time you received a gift.",
        "What makes a gift meaningful?",
        "On my last birthday, my younger sister gave me a small notebook filled with family photos and short messages. She had asked our parents and grandparents to write one memory on different pages. The notebook was not something I had requested, and it probably cost very little, but it took a great deal of time to prepare. We looked through it together after dinner, and several old stories made us laugh.",
        "I felt surprised, loved and grateful for the effort behind the gift. It became more valuable to me than a costly item from a shop. I learned that a gift can carry time, attention and shared history, not only a price.",
        "a meaningful gift matches the person and shows that the giver has listened or remembered something important. It may be useful, personal or connected to a shared experience. The cost should fit the giver's situation and should not create pressure to return an equal item. A kind message can also be a gift. Thought and timing usually matter more than size or brand.",
    ),
    p4(
        "Receiving help (???c ng??i kh?c gi?p ??)",
        "Tell me about a time someone helped you.",
        "Why can asking for help be difficult, and how can people do it well?",
        "When I moved into a new apartment, a heavy table would not fit through the door. I tried to turn it several ways and became frustrated. A neighbour heard the noise and offered to help. He showed me how to remove the table legs, and together we carried each part inside. He also lent me a tool to put it back together. The whole problem was solved in twenty minutes, and no furniture was damaged.",
        "I felt embarrassed that I could not solve the problem alone, then grateful for the neighbour's calm support. I learned that asking early can prevent injury and wasted time. I also became more willing to offer help to him later.",
        "people may avoid asking because they fear looking weak or creating work for someone else. A good request is clear, polite and limited: explain the problem, say what kind of help is needed and accept a no. People should first try reasonable steps themselves, but not wait until a small issue becomes dangerous. Receiving help also creates a chance to return support in the future.",
    ),
    p4(
        "Being asked to stop an activity (???c y?u c?u d?ng l?m m?t vi?c)",
        "Tell me about a time someone asked you to stop doing something.",
        "Why are respectful boundaries important in shared spaces?",
        "One evening, I was watching a football match on my laptop with the sound quite high. My flatmate had an early exam and asked me to turn it down or use headphones. At first, I wanted to finish the exciting part, but I realised that the noise was passing through the thin wall. I apologised, put on headphones and later agreed on quiet hours for our apartment. We had no further problem.",
        "I felt a little annoyed for a moment, then embarrassed because the request was reasonable. I learned not to treat a polite boundary as a personal attack. A short conversation prevented the issue from becoming a larger argument.",
        "shared spaces work well when people explain needs clearly and respect the rights of others. Requests should focus on the behaviour, not insult the person, and both sides should listen. Rules about noise, cleaning or common items are easier when agreed in advance. Everyone makes mistakes, so an apology and quick change are often enough. Respectful boundaries protect both comfort and relationships.",
    ),
    p4(
        "Getting lost (B? l?c ???ng)",
        "Tell me about a time you got lost.",
        "What should people do to stay safe when they lose their way?",
        "During my first visit to Hanoi, I left a small caf? and walked towards what I thought was my hotel. After twenty minutes, the streets looked unfamiliar and my phone battery was almost empty. I stopped walking, entered a busy bookshop and asked a staff member for help. She marked the route on a paper receipt and let me charge my phone for a few minutes. I reached the hotel safely before dark.",
        "I felt worried when I realised I had been moving in the wrong direction, but stopping in a safe public place helped me think clearly. I learned to save the hotel address, carry a small charger and ask before I become completely lost.",
        "lost travellers should stay calm, avoid unsafe shortcuts and look for a trusted public place such as a shop, station or hotel. They can check a map, contact someone and share their location if possible. Carrying an address in the local language is useful. Preparation matters, but asking a clear question is often the fastest solution. Pride should never be more important than safety.",
    ),
    p4(
        "Visiting an old building (Th?m m?t t?a nh? c?)",
        "Tell me about a time you visited an old building.",
        "Why should historic buildings be protected?",
        "Last year, I visited an old merchant house in Hoi An. A guide showed our small group the wooden rooms, a central open space and marks left by past floods. The house was narrow from the street but much longer inside. Family photographs and simple tools made the history feel personal. We had to walk carefully and could not touch some objects because the wood was old and easily damaged.",
        "I felt connected to people who had lived there many years before. I also became aware that the building could not survive without regular care. I learned that a guided explanation can turn an old structure into a clear story about daily life.",
        "historic buildings provide evidence of local design, work and family life. They give a town identity and can support education and responsible tourism. Protection is expensive, so communities need skilled repair, clear visitor rules and useful modern roles for some buildings. New development is necessary, but once an important old place is destroyed, its original detail and memory cannot simply be rebuilt.",
    ),
    p4(
        "Breaking a rule (Ph?m m?t quy ??nh)",
        "Tell me about a time you broke a rule.",
        "Why do rules matter, and when should they be changed?",
        "At university, I once entered a quiet study room with a drink even though food and drinks were not allowed. I thought a closed bottle would cause no problem. While moving my bag, I knocked it over and a little water reached the floor near another student's books. Nothing was damaged, but the staff member asked me to leave and clean the area. I apologised and followed the rule from then on.",
        "I felt embarrassed because the exact problem behind the rule almost happened. I learned that a rule may protect other people even when it seems inconvenient. If I disagree, I should ask about it rather than quietly decide that it does not apply to me.",
        "rules create safety, fairness and clear expectations in shared places. Good rules have a clear purpose, are explained and apply consistently. However, rules can become old or unfair, so people should have a respectful way to question them and offer evidence for change. Breaking a rule secretly is usually less useful than discussing it openly. Freedom works best with responsibility for how actions affect others.",
    ),
    p4(
        "Attending a music festival (Tham gia l? h?i ?m nh?c)",
        "Tell me about a time you attended a music festival.",
        "What makes a large music event enjoyable and safe?",
        "Three years ago, I attended a one-day music festival in a city park with two friends. Several local bands performed on an outdoor stage, and small food stalls stood around the field. We arrived before the main crowd, agreed on a meeting point and carried water and light raincoats. My favourite moment was when the final singer asked everyone to sing a familiar song together as the sun went down.",
        "I felt excited by the live sound and the friendly crowd. I was also glad that we had planned where to meet because the area became very busy. I learned that simple preparation allows people to enjoy a large event with less worry.",
        "a good festival needs clear information, skilled performers, working sound and enough space to rest. Safety depends on crowd control, visible staff, drinking water, medical support and easy exits. Visitors also share responsibility: they should follow instructions, protect their hearing and look after friends. The event is most enjoyable when excitement does not remove respect for other people or the local area.",
    ),
    p4(
        "Watching a sports match (Xem m?t tr?n ??u th? thao)",
        "Tell me about a time you watched a sports match.",
        "Why do sports bring large groups of people together?",
        "I watched an important football match between Vietnam and another national team at a friend's home. About eight of us brought simple food and arrived before the game began. The match was close, and our team scored near the end. Everyone stood up and cheered, even though we had been quiet a moment earlier. After the match, we discussed the best plays and helped clean the room before going home.",
        "I felt nervous during the final minutes and very happy when the goal was scored. The shared reaction made the game more memorable than watching alone. I learned that sport can connect people quickly, but fans should still stay respectful when results disappoint them.",
        "sports offer a clear story with rules, skill, uncertainty and a result that people can experience together. A team may represent a school, city or country, which creates a strong sense of belonging. Matches also give families and friends a regular social activity. This unity is positive when supporters respect opponents and players. Competition should build excitement, not violence or personal hate.",
    ),
    p4(
        "Joining an activity for children (Tham gia ho?t ??ng cho tr? em)",
        "Tell me about a time you took part in an activity for children.",
        "What makes an activity useful and enjoyable for children?",
        "Last summer, I helped at a reading morning for primary school children in a local library. My group prepared a short animal story, picture cards and a simple drawing task. At first, some children were too shy to answer, so we let them discuss in pairs before speaking. By the end, nearly everyone had shown a drawing and said one sentence about it. We gave each child a small bookmark to take home.",
        "I felt responsible because children quickly notice when instructions are unclear or an adult loses patience. Their growing confidence made me happy. I learned to use short steps, praise real effort and leave enough room for imagination.",
        "children's activities work best when they are safe, age-appropriate and active. A clear goal is helpful, but children also need choices and chances to move, ask and create. Adults should include quieter children without forcing them and should never compare abilities in a hurtful way. Simple materials can be enough; patient guidance and genuine attention matter more than an expensive programme.",
    ),
    p4(
        "A favourite outfit (Trang ph?c y?u th?ch)",
        "Tell me about an outfit that you like wearing.",
        "How do clothes affect confidence and the way people are treated?",
        "My favourite outfit is a light blue shirt, dark trousers and simple white shoes. I first put these clothes together for a job interview, but now I also wear them to family events or important meetings. The shirt fits well without feeling tight, and all three items are easy to match with other clothes. I take care of them and replace only what is worn, so the outfit has remained useful for several years.",
        "I feel neat, comfortable and prepared when I wear it. The outfit does not make me a different person, but it removes one small worry before an important event. I learned that good fit and comfort matter more to me than a famous brand.",
        "clothes can support confidence and show respect for a situation, but they should not decide a person's value. First impressions are real, especially at work, yet people have different budgets, cultures and physical needs. Dress rules should be clear and reasonable. The best clothing allows someone to move comfortably, express some personality and focus on the activity rather than feeling judged all day.",
    ),
    p4(
        "Sleeping habits (Th?i quen ng?)",
        "Tell me about your sleeping habits and a time you changed them.",
        "Why is good sleep important, and how can people improve it?",
        "I used to go to bed at very different times and often watched short videos until after midnight. As a result, I felt sleepy at work and depended on coffee. Earlier this year, I set a regular bedtime, moved my phone away from the bed and prepared clothes for the next morning before ten o'clock. I did not follow the plan perfectly, but after two weeks I began waking more easily and thinking more clearly.",
        "The change felt difficult at first because late-night phone use had become automatic. Better energy during the day gave me a reason to continue. I learned that sleep improves through a simple routine, not through one long night at the weekend.",
        "good sleep supports memory, mood, physical health and safe decisions. People can improve it by keeping a regular time, reducing bright screens, limiting late coffee and making the room quiet and comfortable. Worry can still disturb sleep, so writing tomorrow's tasks may help. If a serious problem continues, professional advice is sensible rather than simply trying to work through constant tiredness.",
    ),
    p4(
        "Attending an English course (Tham gia kh?a h?c ti?ng Anh)",
        "Tell me about a time you attended an English course.",
        "What makes a language course effective?",
        "I attended a twelve-week evening English course after work. The class met twice a week and focused on everyday speaking. Our teacher used pair tasks, short recordings and topics such as travel and work. At first, I prepared full sentences in my head and spoke slowly. The teacher encouraged us to use key words instead. I also met one classmate online each Sunday, and by the final week we could hold a longer conversation with fewer pauses.",
        "I felt shy during the first lessons but supported because everyone was learning. Regular speaking made mistakes feel normal rather than frightening. I learned that active practice and useful correction improve confidence more than silently studying many difficult words.",
        "an effective language course gives learners clear goals, frequent chances to use the language and feedback they can understand. Lessons should connect to real needs and include listening, speaking, reading and writing in a balanced way. A teacher guides progress, but students need short practice between classes. The best course level is challenging enough to create growth without making every task feel impossible.",
    ),
    p4(
        "Helping a classmate (Gi?p ?? m?t b?n h?c)",
        "Tell me about another time you helped someone.",
        "How can people help without taking away another person's independence?",
        "A classmate once missed a week of lessons because she was ill. When she returned, she was worried about a group assignment. I shared my notes, explained the main task and showed her where the teacher had posted examples. I did not complete her section for her; instead, we worked in the library for an hour while she made her own plan. She finished on time and later helped me prepare for a different test.",
        "I felt pleased that my notes became useful, and I respected the effort she made to catch up. I learned that effective help provides tools and confidence rather than doing all the work for another person.",
        "good support should begin by asking what the person needs. Advice, information or a small practical action may be enough. Doing everything can create dependence or reduce learning, while refusing all help can leave someone stuck. The goal is to remove an unfair barrier and let the person keep control. Respectful help also accepts that the person may choose a different solution.",
    ),
    p4(
        "Hurrying to catch transport (V?i ?? k?p ph??ng ti?n)",
        "Tell me about another time you were in a hurry.",
        "How should people respond when a delay may affect others?",
        "I was once in a hurry to catch the last evening train after a work event. The meeting ended late, and traffic to the station was slow. I checked the train time, told my friend what was happening and asked the taxi driver to use the normal fastest route without driving unsafely. I reached the platform just before the doors closed. I had already bought the ticket on my phone, which saved several minutes.",
        "I felt anxious because missing the train would also worry the relative waiting for me. I was relieved to arrive, but I did not enjoy the rush. I learned to leave events earlier and identify a backup option before the final service.",
        "when a delay affects others, people should communicate early, give an honest new time and avoid making unsafe choices. A short apology and clear update are more respectful than silence or a false promise. Planning extra time helps, but delays still happen. Taking responsibility means reducing the effect on other people and learning what can be changed next time.",
    ),
    p4(
        "Choosing a place to live (Ch?n n?i ? gi?a nhi?u l?a ch?n)",
        "Tell me about another time you had many choices.",
        "What information is most important when choosing a place to live?",
        "When I moved for work, I viewed six different rooms in one week. Some were cheap but far from the office, while others were modern but above my budget. I made a table comparing rent, travel time, safety, light and whether bills were included. I also visited the two best areas after dark. In the end, I chose a smaller room near a bus line because the full monthly cost and daily journey were more reasonable.",
        "I felt tired by repeated viewings and worried about making a quick mistake. The comparison table helped me separate attractive details from practical needs. I learned that the cheapest listed price is not always the lowest total cost.",
        "people choosing a home should check safety, total cost, transport, basic condition and the terms of the agreement. They should view the actual place, ask about repairs and understand which bills are included. Personal needs also differ: one person may value quiet, while another needs access to school. A good home supports daily life and leaves enough money for other essential needs.",
    ),
    p4(
        "Answering a difficult question in class (Tr? l?i c?u h?i kh? trong l?p)",
        "Tell me about another time you received a difficult question.",
        "How can teachers use difficult questions in a positive way?",
        "During an English class, the teacher asked whether technology always improves education. I had expected a personal question and did not have a ready answer. I paused, said that technology gives access to information, and then added that weak internet and distraction can create problems. I used an example from an online lesson and gave a balanced conclusion. My grammar was not perfect, but the class understood and another student added a different view.",
        "I felt nervous during the pause but more confident as my ideas became organised. I learned that a simple structure with both sides can answer a complex question better than searching for impressive words.",
        "teachers can use difficult questions to develop thinking, not to embarrass students. Giving a little planning time, accepting more than one reasonable view and asking follow-up questions creates a safe challenge. Feedback should recognise the idea as well as correct language. Students grow when they are allowed to think aloud, make a small mistake and improve the answer with support.",
    ),
    p4(
        "Putting a lot of effort into fitness (N? l?c nhi?u cho s?c kh?e)",
        "Tell me about another time you had to put in a lot of effort.",
        "How can people build a healthy habit that lasts?",
        "After a health check, I decided to prepare for a five-kilometre charity walk. At first, I became tired after only fifteen minutes. I followed an eight-week plan, walked three evenings a week and slowly increased the distance. A friend joined me on Sundays, which kept the activity social. On the event day, the weather was warm, but I completed the full route without injury and collected a small amount of money for the charity.",
        "I sometimes felt impatient because improvement was slow. Finishing each week's plan made me feel stronger and more in control. I learned that safe progress comes from regular effort and rest, not from one extremely hard session.",
        "a lasting healthy habit should be simple, realistic and connected to a personal reason. People can start below their maximum, choose a regular time and track a small measure such as minutes or distance. Enjoyable company helps, but the plan should still work alone. Missing one day is normal; returning at the next planned time matters more than feeling guilty or giving up.",
    ),
    p4(
        "Planning an important event (L?n k? ho?ch cho m?t s? ki?n)",
        "Tell me about a time you spent a lot of time planning something.",
        "When does careful planning help, and when can it become a problem?",
        "I spent several weeks planning a small surprise party for my parents' wedding anniversary. I asked relatives which date was suitable, booked a simple restaurant and collected family photos for a short video. I kept the budget in a shared table with my sister and called the restaurant two days before the event. One cousin cancelled at the last minute, but the seating plan was flexible. My parents were surprised and enjoyed the evening.",
        "I felt responsible because many people were involved and the event was meant to stay secret. The careful checks reduced stress on the day. I learned to focus on the few details that affect everyone and accept that a small change does not ruin the whole plan.",
        "planning helps when tasks, costs and people need to fit together. A checklist, deadline and backup option can prevent common problems. However, planning becomes harmful when someone keeps changing tiny details, delays action or cannot accept uncertainty. A useful plan guides decisions while leaving space to adjust. The goal is a successful experience, not perfect control over every moment.",
    ),
    p4(
        "Delaying an expensive purchase (Ho?n mua m?t m?n ?? ??t ti?n)",
        "Tell me about another time you wanted to buy something but could not.",
        "How does advertising influence what people want to buy?",
        "I once wanted to buy a new camera before a holiday because online reviews made it look much better than my phone. When I checked the full price, including a lens and memory card, I realised it would use most of my savings. I borrowed a basic camera from a cousin instead and practised with it before the trip. The photos were good, and I discovered that I did not use many of the advanced controls.",
        "I felt disappointed when I first delayed the purchase, but borrowing gave me a safe way to test the idea. I learned that wanting professional equipment is not the same as needing it, and skill can matter more than the newest device.",
        "advertising connects products with attractive feelings such as success, beauty or freedom. Reviews and repeated images can make an upgrade seem urgent even when the current item works. People can protect their budget by waiting, checking the full cost, reading independent information and asking how often they will use the product. Advertising provides information, but the final decision should serve a real need.",
    ),
    p4(
        "Taking a long trip (C? m?t chuy?n ?i d?i)",
        "Tell me about a time you had a long trip.",
        "How can long journeys be made more comfortable and responsible?",
        "My longest recent trip was an overnight train journey from Ho Chi Minh City to Da Nang. I travelled with my sister and booked two beds in a shared cabin. We brought light food, water, warm clothes and downloaded music before leaving. At first, the sound of the train made sleep difficult, but later it became regular and calming. In the morning, we watched the coast through the window and talked with another passenger.",
        "I felt tired but also excited because the journey itself showed us parts of the country we usually miss by plane. I learned that simple preparation, patience and respect for other passengers make shared travel much easier.",
        "long journeys improve when travellers choose suitable seats, carry only needed items, drink water and take safe movement breaks. Quiet entertainment helps without disturbing others. Responsible travel also means reducing waste and choosing shared transport when practical. Speed is not the only value; a slower trip can be enjoyable if people understand the conditions and allow enough recovery time afterwards.",
    ),
    p4(
        "Visiting a tall building (Th?m m?t t?a nh? cao t?ng)",
        "Tell me about a time you visited a tall building.",
        "What are the benefits and problems of tall buildings in cities?",
        "During a visit to Ho Chi Minh City, I went to the viewing floor of a very tall office building with a cousin. A fast lift took us up in less than a minute. Through the large windows, we could see the river, roads and much smaller buildings in every direction. We used a display to identify places we knew and stayed until the city lights came on. The safety barrier made the height feel manageable.",
        "I felt amazed by the wide view and slightly nervous when I first stood near the glass. Seeing the traffic from above changed my sense of the city's size. I learned that good design and clear safety information help visitors feel comfortable at great height.",
        "tall buildings use limited city land efficiently and can place homes, offices and services near public transport. They may also become useful city signs. However, construction and energy use are high, lifts must be reliable and large towers can block light or change local streets. Cities need strong safety rules, green design and public space at ground level so height serves people rather than only profit.",
    ),
    p4(
        "Encountering bad weather (G?p th?i ti?t x?u)",
        "Tell me about a time you encountered bad weather.",
        "How should people prepare for changing or extreme weather?",
        "Last autumn, my friends and I were returning from a day trip when a strong rainstorm began. The road quickly filled with water, and riding motorbikes became unsafe. We stopped at a well-lit shop, moved the bikes away from the road and checked the weather report. We informed our families and waited nearly an hour until the rain became lighter. We arrived home late but safely and avoided a low road that local people warned us about.",
        "I felt worried because visibility was poor, but stopping gave us control over the situation. I learned that keeping to a schedule is less important than safety and that local advice can be valuable during unusual weather.",
        "people should check reliable forecasts, carry suitable clothing and know safe routes or shelters. Phones need enough power, and family members should know travel plans during severe conditions. Communities also need clear warnings and support for vulnerable people. Weather cannot be controlled, so preparation must include the willingness to delay, cancel or change a plan. Taking a risk to save a little time is rarely worthwhile.",
    ),
    p4(
        "Hearing good family news (Nh?n tin vui t? gia ??nh)",
        "Tell me about another time you received good news.",
        "How can families support one another during important changes?",
        "Last year, my older sister called to say that she and her husband were expecting their first child. They had waited until a health check before telling the family. My parents and I were together when the call came, so we all heard the news at the same time. We asked how she felt, discussed when we could visit and later prepared a small family meal to celebrate without making the day too tiring for her.",
        "I felt surprised, joyful and aware that our family roles were about to change. I learned that good news can also bring new duties, and the best first response is to listen to what the people directly involved need.",
        "families can support change by offering practical help, respecting personal choices and communicating without pressure. During a birth, move or new job, useful support may include meals, transport or simply a patient conversation. Advice should be offered carefully rather than forced. Celebrating is important, but support continues after the exciting announcement, when daily work and adjustment begin.",
    ),
    p4(
        "Doing something I did not want to do (L?m m?t vi?c m?nh kh?ng mu?n)",
        "Tell me about a time you did something you did not want to do.",
        "When should people accept an unpleasant duty, and when should they say no?",
        "I once agreed to give a short report at a large staff meeting because my colleague became ill. I dislike speaking in front of many people and wanted my manager to find someone else. However, I knew the project well and had one day to prepare. I reduced the report to three points, practised with another colleague and answered two questions. The meeting went better than I expected, and the sick colleague thanked me later.",
        "I felt nervous and unwilling at first, but also responsible for the team. Completing the task increased my confidence. I learned that discomfort can be temporary and useful when the request is fair, safe and connected to something I value.",
        "people should accept some unpleasant duties because work, family and shared life cannot always match personal preference. A fair task, short-term difficulty or chance to help may be worth the effort. However, they should say no to unsafe, dishonest or repeatedly unfair demands. Clear boundaries and a polite explanation protect well-being. Responsibility does not mean agreeing to everything.",
    ),
    p4(
        "Dealing with rude behaviour (??i m?t v?i ng??i thi?u l?ch s?)",
        "Tell me about a time someone was rude to you.",
        "What is the best way to respond to rude behaviour?",
        "While waiting in a supermarket queue, a man stepped directly in front of me and said he was in a hurry. I pointed to the end of the line and calmly said that everyone had been waiting. He replied in an angry voice, but the cashier also asked him to join the queue properly. I did not continue the argument. A few minutes later, he moved away, and the other customers were served in order.",
        "I felt annoyed and my heart beat faster, but staying calm stopped the situation from growing. I learned to describe the unfair action clearly, ask staff for support when needed and avoid returning an insult.",
        "the best response depends on safety and seriousness. People can use a calm voice, set a simple boundary and focus on behaviour rather than attacking character. In a public place, staff or another responsible person may help. If the situation feels dangerous, leaving is wiser than proving a point. Rudeness should not be accepted, but matching it often creates a larger problem.",
    ),
    p4(
        "Travelling to Da Lat (Du l?ch ??n ?? L?t)",
        "Tell me about a place you have travelled to.",
        "How can tourism benefit a place without damaging it?",
        "A place I remember well is Da Lat, which I visited with my family in the cool season. We stayed near the centre but spent most of our time at a flower garden, a small farm and a lake outside the busiest area. We tried local vegetables and hot soy milk in the evening. The weather changed quickly, so our light jackets and umbrellas were useful. I especially enjoyed the pine trees and slower pace.",
        "I felt refreshed because the air and scenery were very different from my home city. I also noticed traffic and rubbish at one popular site. I learned that visitors affect a place through their transport, spending and everyday behaviour.",
        "tourism creates jobs, supports local food and crafts, and gives communities a reason to protect valued places. However, too many visitors can raise prices, create waste and damage nature. Travellers can stay in responsible businesses, follow local rules, avoid single-use items and visit beyond the busiest hours. Local people should have a strong voice in how tourism grows and who receives its benefits.",
    ),
    p4(
        "Wanting an opportunity but not getting it (Mu?n m?t c? h?i nh?ng kh?ng ??t ???c)",
        "Tell me about a time you wanted something but could not get it.",
        "How can people respond positively to disappointment?",
        "I once applied for a place on a short company training course in another city. Only five employees could attend, and I was not selected because priority went to staff with longer experience. I felt disappointed, but I asked the organiser which skills the course covered. I found similar free lessons online and practised with a colleague. Six months later, I used that knowledge in a project and was chosen for a different workshop.",
        "At first, the decision felt personal even though the reason was clear. Taking a useful next step helped me regain confidence. I learned that not getting one opportunity does not remove the wider goal or the ability to prepare for another chance.",
        "a positive response to disappointment begins with accepting the feeling instead of pretending it does not matter. Then people can ask for fair feedback, separate what they can control and choose one next action. Sometimes the decision was unfair and should be questioned, but constant anger rarely creates progress. Support, rest and a new route can turn a closed door into useful direction.",
    ),
    p4(
        "Visiting a friend (T?i th?m m?t ng??i b?n)",
        "Tell me about a time you visited a friend.",
        "Why are face-to-face visits still important?",
        "Last month, I visited a university friend who had moved to a town about two hours away. We had kept in touch by message, but had not met for nearly a year. I travelled by bus on Saturday morning and brought a small local snack. He showed me his new apartment and neighbourhood, and we cooked lunch together. In the afternoon, we walked by the river and talked about work, family and old classmates.",
        "I felt comfortable almost immediately, even after the long gap. Seeing his daily surroundings helped me understand his new life better than messages had. I learned that a friendship can stay strong when both people make a real effort to reconnect.",
        "face-to-face visits provide full attention, shared activity and small details that a screen often misses. They are especially valuable during major changes or difficult times. Travel takes time and money, so visits may not be frequent, and online contact remains useful between them. Planning a simple meeting, respecting the host's routine and helping with practical tasks can make the time warm rather than demanding.",
    ),
]


PART4_GUIDE_QUESTIONS = (
    "Tell me about a personal experience connected to the topic.",
    "How did you feel, and what did you learn from that experience?",
    "Why is this topic important for people in general?",
)

PART4_GUIDE_ANSWER = "\n\n".join(
    (
        s("""First, answer the personal question with one clear event. Say when and
        where it happened, who was involved, and what the main situation was. Then
        explain two or three actions in time order and give a real result. For example:
        Last year, I had to [situation]. I first [action], then [action]. In the end,
        [result]. Keep the details simple enough to say naturally."""),
        s("""Second, explain your feelings and lesson. Show a small change instead of
        listing many feelings: At first, I felt [feeling] because [reason]. As the
        situation changed, I became [new feeling]. Looking back, I learned [lesson].
        This part connects the event to your own thinking and helps the answer sound
        complete rather than memorised."""),
        s("""Finally, move to the wider question. Give a direct opinion, two reasons
        and a balanced final point: In general, I believe [opinion]. One reason is
        [reason], and another is [reason]. However, [limit or other side]. Overall,
        [short conclusion]. Use common linking words clearly. B2 comes from full,
        organised ideas and controlled sentences, not from rare vocabulary."""),
    )
)

EASY_REPLACEMENTS = {
    "breathtaking": "very beautiful",
    "proficiency": "ability",
    "productivity": "ability to work well",
    "resilience": "the ability to recover",
    "aspirations": "future plans",
    "overwhelmed": "unsure",
    "worthwhile": "worth the effort",
    "uncertainty": "things they cannot predict",
    "vulnerable people": "people who need more support",
    "intergenerational": "between age groups",
    "persuaded": "encouraged",
    "responsibly": "in a careful way",
    "controlled risk": "safe challenge",
}

BANNED_STYLE = (
    "wholesome",
    "total power vibes",
    "on cloud nine",
    "let's be real",
    "gonna",
    "wanna",
    "super ",
    "rocking a ",
)


def make_easier(text: str) -> str:
    result = s(text)
    for difficult, simple in EASY_REPLACEMENTS.items():
        result = result.replace(difficult, simple).replace(
            difficult.capitalize(), simple.capitalize()
        )
    return result


def shorten_part3_answer(text: str, question_number: int) -> str:
    """Keep the clearest ideas and put each one on a separate reading line."""
    sentences = split_sentences(make_easier(text))
    if question_number == 1:
        comparison_sentences = [
            index
            for index, sentence in enumerate(sentences)
            if re.search(r"\b(first|second)\b", sentence, re.IGNORECASE)
        ]
        preferred = comparison_sentences + [len(sentences) - 1, 0]
    else:
        preferred = [0, 1, len(sentences) - 1, 2]

    chosen: list[int] = []
    word_count = 0
    for index in preferred + list(range(len(sentences))):
        if index < 0 or index >= len(sentences) or index in chosen:
            continue
        sentence_words = len(sentences[index].split())
        if word_count + sentence_words <= 64 or word_count < 42:
            chosen.append(index)
            word_count += sentence_words
        if word_count >= 48:
            break

    chosen.sort()
    return "\n".join(sentences[index] for index in chosen)


def apply_b2_content(payload: dict[str, Any]) -> dict[str, Any]:
    part1 = payload["part1"]
    part2 = payload["part2"]
    part3 = payload["part3"]
    part4 = payload["part4"]

    if tuple(map(len, (part1, part2, part3, part4))) != (56, 37, 25, 53):
        raise ValueError("Unexpected Speaking record counts")
    if len(PART2_SETS) != 37 or len(PART3_SETS) != 25 or len(PART4_SPECS) != 52:
        raise ValueError("Curated Speaking content is incomplete")

    # The first 28 Part 1 records are the clean, source-faithful models.  The
    # next 28 repeat the same topics with weaker wording, so standardise both
    # collections to the stronger accessible-B2 versions.
    for index in range(28):
        source = part1[index]
        question = source["question"]
        answer1 = make_easier(source["answer1"])
        answer2 = make_easier(source["answer2"])
        for target in (part1[index], part1[index + 28]):
            target["question"] = question
            target["answer1"] = answer1
            target["answer2"] = answer2

    for row, (questions, answers) in zip(part2, PART2_SETS):
        for number, (question, answer) in enumerate(zip(questions, answers), 1):
            row[f"question{number}"] = question
            row[f"question{number}_answer"] = answer
    # The last source prompt concerns exhibitions but originally showed a
    # business meeting. Reuse the matching gallery photo already in the set.
    part2[36]["urlpic1"] = part2[28]["urlpic1"]

    for row, (questions, answers) in zip(part3, PART3_SETS):
        for number, (question, answer) in enumerate(zip(questions, answers), 1):
            row[f"question{number}"] = question
            row[f"question{number}_answer"] = shorten_part3_answer(answer, number)

    guide = part4[0]
    guide["question"] = "Accessible B2 frame for Aptis Speaking Part 4"
    for number, question in enumerate(PART4_GUIDE_QUESTIONS, 1):
        guide[f"question{number}"] = question
    guide["answer1"] = PART4_GUIDE_ANSWER

    for row, spec in zip(part4[1:], PART4_SPECS):
        row["question"] = spec["title"]
        for number in range(1, 4):
            row[f"question{number}"] = spec[f"question{number}"]
        row["answer1"] = make_part4_answer(spec)

    payload["meta"].update(
        {
            "modelLevel": "Accessible B2",
            "contentVersion": "2026-07-27-easy-reading",
            "timings": {"part1": 30, "part2": 45, "part3": 45, "part4": 120},
        }
    )
    validate_b2_content(payload)
    return payload


def validate_b2_content(payload: dict[str, Any]) -> None:
    limits = {1: (45, 78), 2: (62, 92), 3: (45, 68), 4: (110, 180)}
    answer_keys = {
        1: ("answer1", "answer2"),
        2: ("question1_answer", "question2_answer", "question3_answer"),
        3: ("question1_answer", "question2_answer", "question3_answer"),
        4: ("answer1",),
    }
    problems: list[str] = []
    for part in range(1, 5):
        rows = payload[f"part{part}"]
        for row_index, row in enumerate(rows, 1):
            for key in answer_keys[part]:
                answer = row[key]
                lowered = answer.lower()
                if "<" in answer or any(phrase in lowered for phrase in BANNED_STYLE):
                    problems.append(f"Part {part} set {row_index} {key}: style or HTML")
                words = len(answer.replace("\n", " ").split())
                low, high = limits[part]
                if part == 4 and row_index == 1:
                    low = 140
                if not low <= words <= high:
                    problems.append(
                        f"Part {part} set {row_index} {key}: {words} words, expected {low}-{high}"
                    )
            if part in (2, 3, 4):
                for number in range(1, 4):
                    if not row.get(f"question{number}"):
                        problems.append(f"Part {part} set {row_index}: missing question {number}")
    if problems:
        raise ValueError("\n".join(problems))

