# MLD

admin (**id**, firstname, lastname, email, password)

quiz (**id**, title, description, #admin(id))

tag (**id**, name, color)

question (**id**, text, #quiz(id), #level(id), #answer(id))

answer (**id**, text, #question(id))

level (**id**, name, color)

quiz_has_tag (#quiz(id), #tag(id))