/*
Assume meal_planner database has been created

*/
-- DROP TABLE search_history;
-- DROP TABLE user;

DROP TABLE IF EXISTS  recipe_user ;
DROP TABLE IF EXISTS  recipe_ingredient ;
DROP TABLE IF EXISTS  recipe ;
DROP TABLE IF EXISTS  ingredient ;

CREATE TABLE IF NOT EXISTS user (
    username VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL PRIMARY KEY
);

-- INSERT INTO user(username, email)
--     VALUES ('dev', 'dev@email.com');


CREATE TABLE IF NOT EXISTS search_history (
    id INT AUTO_INCREMENT PRIMARY KEY ,  
    search_text VARCHAR(255) NOT NULL, 
    search_type VARCHAR (50) NOT NULL, 
    search_time DATETIME NOT NULL,
    min_carb INT,
    max_carb INT,
    min_fat INT,
    max_fat INT,
    min_protein INT, 
    max_protein INT,
    min_cal INT,
    max_cal INT,
    user_id VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user(email) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ingredient (
    id INT AUTO_INCREMENT PRIMARY KEY ,  
    name VARCHAR(255) NOT NULL, 
    food_id INT,
    carbs INT,
    protein INT,
    fat INT,
    calories INT,
    user_id VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user(email) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS recipe (
    id INT AUTO_INCREMENT PRIMARY KEY ,  
    title VARCHAR(255) NOT NULL,
    servings INT,
    prep_time INT,
    cook_time INT, 
    carbs INT,
    protein INT,
    fat INT,
    calories INT,
    instructions TEXT(16383),
    user_id VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user(email) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS static_recipe (
    id INT AUTO_INCREMENT PRIMARY KEY ,  
    recipe_id INT,
    recipe_name VARCHAR(255),
    user_id VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user(email) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS recipe_ingredient (
    id INT AUTO_INCREMENT PRIMARY KEY , 
    qty INT,
    units VARCHAR(16), 
    recipe_id INT,
    FOREIGN KEY (recipe_id) REFERENCES recipe(id) ON DELETE CASCADE,
    ingredient_id INT,
    FOREIGN KEY (ingredient_id) REFERENCES ingredient(id) ON DELETE CASCADE
);

INSERT INTO ingredient (name, carbs, protein, fat, calories, user_id) values ('Egg', 2, 6, 5, 70, 'dev@email.com') ;
INSERT INTO ingredient (name, carbs, protein, fat, calories, user_id) values ('Fish', 16, 20, 10, 200, 'dev@email.com');
INSERT INTO ingredient (name, carbs, protein, fat, calories, user_id) values ('Beef', 16, 25, 15, 250, 'dev@email.com');
INSERT INTO ingredient (name, carbs, protein, fat, calories, user_id) values ('Cheese', 4, 7, 25, 400, 'dev@email.com');
INSERT INTO ingredient (name, carbs, protein, fat, calories, user_id) values ('Onion', 1, 2, 0, 40, 'dev@email.com');
INSERT INTO ingredient (name, carbs, protein, fat, calories, user_id) values ('Water', 0, 0, 0, 0, 'dev@email.com');
INSERT INTO ingredient (name, carbs, protein, fat, calories, user_id) values ('Chicken', 7, 23, 12, 220, 'dev@email.com');
INSERT INTO ingredient (name, carbs, protein, fat, calories, user_id) values ('Carrot', 2, 1, 0, 25, 'dev@email.com');


/*CREATE TABLE IF NOT EXISTS Recipe;
CREATE TABLE IF NOT EXISTS Meal;
CREATE TABLE IF NOT EXISTS RecipeBook;
CREATE TABLE IF NOT EXISTS RecipeMeal;
CREATE TABLE IF NOT EXISTS MealPlan;


CREATE TABLE IF NOT EXISTS IngredientRecipe;
CREATE TABLE IF NOT EXISTS MealPlanMeal;
CREATE TABLE IF NOT EXISTS RecipeBookRecipe';
*/

-- INSERT INTO Ingredient(name)
-- VALUES('Sugar'),
-- ('Flour'),
-- ('Egg');



/*
ALTER USER 'username'@'localhost' identified with mysql_native_password by 'new_password'

*/