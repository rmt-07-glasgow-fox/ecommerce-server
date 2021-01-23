const { Product } = require('../models')

class ProductController {

    static async getProduct (req, res, next) {
        try {
            const product = await Product.findAll({order: [['id','ASC']]})

            res.status(200).json(product)

        } catch (err) {
            next(err) 
        }
    }

    static async getProductId (req, res, next) {
        const {id} = req.params
        try {
            const product = await Product.findOne({where : id})

            if (!product) {
                next ({name : 'ProductNotFound'})
            } else {
                res.status(200).json(product)                
            }
        } catch (err) {
            next(err)
        }
    }

    static async createProduct (req, res, next) {
        const { name, image_url, price, stock } = req.body

        const addProduct = { 
            name: name,
            image_url: image_url,
            price: price,
            stock: stock
        }
        if (stock < 0) {

            next ({ name: 'StockCannotLessThanZero'});

        } else if (price < 0) {

            next ({ name : 'PriceCannotLessThanZero'});

        } else {
            try {

                const product = await Product.create( addProduct )
                return res.status(200).json(product)

            } catch (err) {
                next(err)
            }
        }
    }

    static async editProduct (req, res, next) {
        const { id } = req.params;
        const { name, image_url, price, stock } = req.body;

        const editProduct = {
            name,
            image_url,
            price,
            stock
        }

        if ( stock < 0 ) {
            
            next ({ name: 'StockCannotLessThanZero'});

        } else if ( price < 0 ) {

            next ({ name : 'PriceCannotLessThanZero'});

        } else {
            try {
                const product = await Product.findOne( { where: { id } } )

                if (!product) {
                    next ( { name: 'ProductNotFound' } )
                } else {
                    try {
                        const productData = await Product.update(editProduct, { where: { id }})
    
                        return res.status(200).json({message : 'Product Edited'});

                    } catch (err) {                    

                        next (err);

                    }
                }
            } catch (err) {
                next (err)
            }
        }
    }
    
    static async updateProduct (req, res, next) {
        const { id } = req.params
        const { stock } = req.body
        const updateProduct = { stock }

        if ( stock < 0 ) {

            next ( { name: 'StockCannotLessThanZero' } );

        } else {

            try {

                const product = await Product.findByPk( id )
    
                if (!product) {
                    
                    next ( { name : 'ProductNotFound' } );
    
                } else {
    
                    try {
    
                        const productData = await Product.update(updateProduct, { where : { id } } )
    
                        return res.status(200).json ({message : 'Stock Updated'})
    
                    } catch (err) {
    
                        next (err);
    
                    }
                }
                
            } catch (err) {

                next (err);

            }
        }
    }

    static async deleteProduct (req, res, next) {
        const { id } = req.params
        
        try {

            const product = await Product.findByPk(id);

            if (!product) {
                next ( { name: 'ProductNotFound'} )
            } else {

                try {

                    const productData = await Product.destroy( { where: { id } } )

                    return res.status(200).json( { message: 'Product Deleted' } )

                } catch (err) {

                    next(err)

                }

            }

        } catch (err) {

            next(err)

        }
        
    }
}

module.exports = {ProductController}