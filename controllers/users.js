const User = require("../models/user");
const Car = require("../models/car")

module.exports = {
    // index: (req, res, next) => {
    //     User.find({}, (err, users) => {
    //         if (err) {
    //             next(err)
    //         }
    //         res.status(200).json(users)
    //     })
    // },

    // index: (req, res, next) => {

    //     User.find({})
    //         .then(user => {
    //             res.status(200).json(users);
    //         })
    //         .catch(err => {
    //             next(err);
    //         })
    // },

    index: async (req, res, next) => {
        // try {
        const users = await User.find({});

        res.status(200).json(users);
        throw new Error('dummy error')
        // } catch (err) {
        //     next(err);
        // }
    },

    // newUser: (req, res, next) => {
    //     console.log('req body content', req.body)
    //     const newUser = new User(req.body);
    //     console.log('newUser ', newUser)
    //     newUser.save((err, user) => {
    //         res.status(201).json(user);
    //     })
    // }

    // newUser: (req, res, next) => {
    //     const newUser = new User(req.body);
    //     newUser.save()
    //         .then(user => {
    //             res.status(201).json(user)
    //         })
    //         .catch(err => {
    //             next(err);
    //         })
    // },

    newUser: async (req, res, next) => {
        // try {
        const newUser = new User(req.body);
        const user = await newUser.save();
        throw new Error('dummy error')
        res.status(201).json(user);
        // } catch (err) {
        //     next(err)
        // }

    },

    getUser: async (req, res, next) => {
        const { userId } = req.params;

        const user = await User.findById(userId);
        res.status(200).json(user)
    },

    replaceUser: async (req, res, next) => {
        //enforce that req.body must contain all the fields
        const { userId } = req.params;
        const newUser = req.body;
        const result = await User.findByIdAndUpdate(userId, newUser)
        res.status(200).json({ success: true })
    },

    updateUser: async (req, res, next) => {
        //request body may containt any number of the fields
        const { userId } = req.params;
        const newUser = req.body;
        const result = await User.findByIdAndUpdate(userId, newUser)
        res.status(200).json({ success: true })
    },


    getUserCars: async (req, res, next) => {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('cars');
        console.log('user`s cars', user);
        res.status(200).json(user.cars);
    },

    newUserCar: async (req, res, next) => {
        const { userId } = req.params;
        //Create a new car
        const newCar = new Car(req.body);
        console.log('newCar ', newCar);
        // Get User
        const user = await User.findById(userId);
        //Assign user as a car's seller
        newCar.seller = user;
        //Save the car
        await newCar.save();
        //Add car to the user's selling array 'cars'
        user.cars.push(newCar);
        //Save the user
        await user.save();
        res.status(201).json(newCar)
    }

}

/*
We can interact in mongoose in 3 different wayas
1) callbacks
2) Promises
3) [x] Async Await (Promisies)



*/

