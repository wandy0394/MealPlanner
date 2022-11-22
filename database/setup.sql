/*
Assume meal_planner database has been created

*/
DROP TABLE search_history;
DROP TABLE user;

CREATE TABLE IF NOT EXISTS user (
    username VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL PRIMARY KEY
);

INSERT INTO user(username, email)
    VALUES ('dev', 'dev@email.com');


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

-- CREATE TABLE IF NOT EXISTS Ingredient (name VARCHAR(255));

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