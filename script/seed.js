'use strict'

const db = require('../server/db')
const { User, Product, Category } = require('../server/db/models')

/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */

const products = [
  {
    title: 'Conestoga Wagon',
    description: 'For getting where you need to go',
    price: 99999,
    inventory: 15
  },
  {
    title: 'Wagon Wheel',
    description: 'Great condition--good as new & free of rust!',
    price: 2000,
    inventory: 100
  },
  {
    title: 'Soap',
    description: 'Stay clean',
    price: 50,
    inventory: 1000
  },
  {
    title: 'Washboard',
    description: 'Keep your clothes fresh',
    price: 150,
    inventory: 200
  },
  {
    title: 'Flour',
    description: 'For your baking needs',
    price: 30,
    inventory: 2000
  },
  {
    title: 'Oats',
    description: 'For people and livestock',
    price: 20,
    inventory: 2000
  },
  {
    title: 'Team of Oxen',
    description: 'Trained with the same model of wagon we sell in order to maximize compatibility',
    price: 99999,
    inventory: 5
  }, 
  {
    title: 'Palomino Horse',
    description: 'Short in the teeth or your money back',
    price: 99999,
    inventory: 3
  }
]

const categories = [
  {name: "Wagon & Transportation Needs"},
  {name: "Cleanliness is Next to Godliness"},
  {name: "Food & Rations"},
  {name: "Pastimes & Entertainment"},
  {name: "Livestock"}
]

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const newProducts = await Promise.all(products.map(product => Product.create(product)))
  const newCategories = await Promise.all(categories.map(category => Category.create(category)))
  // const users = await Promise.all([
  //   User.create({email: 'cody@email.com', password: '123'}),
  //   User.create({email: 'murphy@email.com', password: '123'})
  // ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  // console.log(`seeded ${users.length} users`)
  console.log(`seeded ${newProducts.length} products`)
  console.log(`seeded successfully`)
}
// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
