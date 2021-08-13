class Player {
    constructor(name, startHealth, character, role) {
        this.name = name;
        this.health = startHealth;
        this.maxHealth = startHealth;
        this.character = character;
        this.hand = [];
        this.equippedItems = [];
        this.role = role;
    }

    // expects a function that takes a player as an argument
    addDeathListener(callback) {
        this.onDeath = callback;
    }

    harm(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.onDeath();
        }
    }

    heal(amount) {
        this.health += amount;
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
    }

    isAlive() {
        return this.health > 0;
    }

    equip(equipment) {
        this.equippedItems.push(equipment);
    }
}

exports.Player = Player;