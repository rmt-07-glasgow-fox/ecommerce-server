const { User } = require('../models')
const {generateToken} = require('../helpers/jwt')
const {comparePassword} = require('../helpers/bcrypt')

class UserController {
    static welcome (req, res) {

        res.send( { message: 'welcome to han commerce' } );

    }

    static async login(req, res, next) {

        const { email, password } = req.body;

        if( !email || !password ) {
            return next({ name: 'EmailOrPasswordCannotBeNull'});
        }

        try {

            const user = await User.findOne( { where : { email } } );

            if ( !user ) {

                return next( { name: 'InvalidEmailOrPassword' } );

            } else {

                const match = comparePassword ( password, user.password );
                
                if ( match ) {

                    const payload = {

                        id: user.id,
                        email: user.email,
                        role: user.role

                    }

                    const access_token = generateToken ( payload );
                    
                    res.status(200).json({access_token});
                } else {

                    return next( { name: 'InvalidEmailOrPassword'} );
                }
            }
            
        } catch ( err ) {
            console.log(err)
            return next(err);

        }
    }

    static async register (req, res, next) {

        const { email, password } = req.body;

        if ( !email, !password ) {

            return next ( { name: 'InvalidEmailOrPassword' } );
        }

        try {

            const user = await User.create( { email, password} );
            const response = { id: user.id, email: user.email}

            return res.status( 201 ).json( response )

        } catch ( err ) {
            console.log(err)
            next( err )
        }
    }
    
}

module.exports = {UserController}