'use strict'

const db = require('../server/db')
const { User, Product, Category, Review } = require('../server/db/models')

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
    inventory: 15,
    photoUrl: 'conestoga_wagon.jpg'
  },
  {
    title: 'Wagon Wheel',
    description: 'Great condition--good as new & free of rust!',
    price: 2000,
    inventory: 100,
    photoUrl: 'wagon_wheel.jpg'
  },
  {
    title: 'Soap',
    description: 'Stay clean',
    price: 50,
    inventory: 1000,
    photoUrl: 'soap.jpg'
  },
  {
    title: 'Washboard',
    description: 'Keep your clothes fresh',
    price: 150,
    inventory: 200,
    photoUrl: 'washboard.jpg'
  },
  {
    title: 'Flour',
    description: 'For your baking needs',
    price: 30,
    inventory: 2000,
    photoUrl: 'flour.jpg'
  },
  {
    title: 'Oats',
    description: 'For people and livestock',
    price: 20,
    inventory: 2000,
    photoUrl: 'oats.jpg'
  },
  {
    title: 'Team of Oxen',
    description: 'Trained with the same model of wagon we sell in order to maximize compatibility',
    price: 99999,
    inventory: 5,
    photoUrl: 'team_of_oxen.jpg'
  },
  {
    title: 'Palomino Horse',
    description: 'Short in the tooth or your money back',
    price: 99999,
    inventory: 3,
    photoUrl: 'palomino.jpg'
  }
]

const categories = [
  {
    name: 'Wagon & Transportation Needs',
    id: 1
  },
  {
    name: 'Cleanliness is Next to Godliness',
    id: 2
  },
  {
    name: 'Food & Rations',
    id: 3
  },
  {
    name: 'Pastimes & Entertainment',
    id: 4
  },
  {
    name: 'Livestock',
    id: 5
  }
]

const reviews = [
  {
    text: "My family's wagon wheel fell off on a treacherous Rocky Mountain path! Luckily we brought extra wheels, purchased from Oregon Trail Outfitters. Highly recommended.",
    rating: 5,
    productId: 2,
    userId: 1
  },
  {
    text: "The flour was infested with mites.",
    rating: 1,
    productId: 5,
    userId: 1
  },
  {
    text: "The oxen healthy and strong but don't respond well to direction.",
    rating: 3,
    productId: 7,
    userId: 1
  },
  {
    text: "The soap works but it gave me dandruff.",
    rating: 4,
    productId: 3,
    userId: 1
  },
  {
    text: "Delicious oats and great price!",
    rating: 5,
    productId: 6,
    userId: 1
  }
]

const users = [
  {
    email: "admin@oregontrailoutfitters.com",
    password: "password",
    isAdmin: true
  },
  {
    id: 101,
    email: "guest@email.com",
    password: "guest",
    isAdmin: false
  }
]

const tags = [
  {
    productId: 1, //conestoga wagon
    categoryId: 2
  },
  {
    productId: 2, //wagon wheel
    categoryId: 2
  },
  {
    productId: 3, //soap
    categoryId: 1
  },
  {
    productId: 4, //washboard
    categoryId: 1
  },
  {
    productId: 5, //oats
    categoryId: 3
  },
  {
    productId: 6, //flour
    categoryId: 3
  },
  {
    productId: 7, //team of oxen
    categoryId: 5
  },
  {
    productId: 8, //horse
    categoryId: 5
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const newProducts = await Promise.all(products.map(product => Product.create(product)))
  const newCategories = await Promise.all(categories.map(category => Category.create(category)))
  const newUsers = await Promise.all(users.map(user => User.create(user)))
  const newReviews = await Promise.all(reviews.map(review => Review.create(review)))

  // const users = await Promise.all([
  //   User.create({email: 'cody@email.com', password: '123'}),
  //   User.create({email: 'murphy@email.com', password: '123'})
  // ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  // console.log(`seeded ${users.length} users`)

  console.log(`seeded ${newProducts.length} products`)
  console.log(`seeded ${newCategories.length} categories`)
  console.log(`seeded ${newReviews.length} reviews`)
  console.log(`seeded ${newUsers.length} users`)
  console.log(`seeded successfully`)

  const conestogaWagon = await Product.findById(1)
  const wagonWheel = await Product.findById(2)
  const soap = await Product.findById(3)
  const washboard = await Product.findById(4)
  const flour = await Product.findById(5)
  const oats = await Product.findById(6)
  const oxen = await Product.findById(7)
  const palomino = await Product.findById(8)
  const rations = await Category.findById(3)
  const pastimes = await Category.findById(4)
  const transportation = await Category.findById(1)
  const cleanliness = await Category.findById(2)
  const livestock = await Category.findById(5)
  await conestogaWagon.setCategories(transportation)
  await wagonWheel.setCategories(transportation)
  await soap.setCategories(cleanliness)
  await washboard.setCategories(cleanliness)
  await flour.setCategories(rations)
  await oats.setCategories(rations)
  await oxen.setCategories(livestock)
  await palomino.setCategories(livestock)
  await oxen.setCategories(livestock)
  await palomino.setCategories(livestock)
  // let updatedWagon = await Product.findOne({where: {id: 1}}, {include: [{model: Category}]})

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
