# Templating engine

```javascript
"This is a [[random|casual]] choice.".replace(
  /\[\[(.+)\]\]/g, function (matches) {
  var choices = matches[1];
  return choices[random(0, choices.length-1)];
});
```

# Word of the day

A curated selection of words with their meaning.

# Three nouns

Scrub a list of the 100-250-500 most common nouns and pick them at random trying to avoid repetition. 

# Subjects

- Write about something you won.
- Write about something you lost.
- Write about something you want.
- Write about something you hate.
- Who do you miss the most? What happened to them?
- Have you ever committed a crime? Why?
- Have you ever had hallucinations? What were they about?
- If you could bring with you on an empty island only three books, what would these books be?
- What would you change about your body?

# Writing prompts

- "Her body is healthy, but she's just not there."
- She flipped her hair and drawled...
- "What do you want from me?"
- I never hated something like I hated…
