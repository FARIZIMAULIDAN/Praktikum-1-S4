var express = require('express');
var router = express.Router();

var connection = require('../config/db.js');
const Model_kategori = require('../Model/Model_kategori.js');

// router.get('/', function(req, res, next){
//     connection.query(`select * from Kategori order by id_kategori desc`,function(err, rows){
//         if(err){
//             req.flash('error', err);
//         }else{
//             res.render('../views/Kategori/index.ejs',{
//                 data:rows
//             });
//         }
//     });
// });

router.get('/',async function(req,res,next){
    let rows = await Model_kategori.getAll();
    res.render('kategori/index',{
        data:rows
    });
})

router.get('/create', function(req, res, next){
    res.render('kategori/create',{
        nama_kategori: ''
    });
});

// router.post('/store', function(req, res, next){
//     try{
//         let {nama_kategori} = req.body;
//         let Data = {
//             nama_kategori
//         };
//         connection.query('insert into kategori set ?', Data, function(err, result){
//             if(err){
//                 req.flash('error', 'gagal menyimpan data!');
//             }else{
//                 req.flash('success', 'Berhasil menyimpan data!');
//             }
//             res.redirect('/kategori');
//         });
//     }catch{
//         req.flash('error', 'Terjadi kesalahan pada fungsi');
//         res.redirect('/kategori');
//     }
// });

router.post('/store',async function(req,res,next){
    try{
        let {nama_kategori} = req.body;
        let Data ={
            nama_kategori
        }
        await Model_kategori.Store(Data);
        req.flash('succes','Berhasil menyimpan data yeay');
        res.redirect('/kategori')
    }catch{
        req.flash('error','gagal menyimpan data');
        res.redirect('/kategori')
    }
})

// router.get('/edit/(:id)', function(req, res, next){
//     let id = req.params.id;
//     connection.query(`select * from kategori where id_kategori = ` + id, function(err, rows){
//         if(err){
//             req.flash('error', 'query gagal!');
//         }else{
//             res.render('kategori/edit', {
//                 id: rows[0].id_kategori,
//                 nama_kategori: rows[0].nama_kategori     
//             });
//         }
//     });
// });

router.get('/edit/(:id)',async function(req,res,next){
    let id = req.params.id;
    let rows = await Model_kategori.getId(id);
    res.render('kategori/edit',{
        id :                    rows[0].id_kategori,
        nama_kategori:          rows[0].nama_kategori,
    })
})

// router.post('/update/:id', function(req, res, next){
//     try{
//         let id = req.params.id;
//         let {nama_kategori} = req.body;
//         let Data = {
//             nama_kategori: nama_kategori
//         };
//         connection.query('update kategori set ? where id_kategori = ' + id, Data, function(err){
//             if(err){
//                 req.flash('error', 'gagal memperbarui data');
//             }else{
//                 req.flash('success', 'Berhasil memperbarui data');
//             }
//             res.redirect('/kategori');
//         });
//     }catch{
//         req.flash('error', 'Terjadi kesalahan pada fungsi');
//         res.redirect('/kategori');
//     }
// });

router.post('/update/(:id)',async function(req,res,next){
    try{
        let id = req.params.id;
        let {nama_kategori} = req.body;
        let Data = {
            nama_kategori
        }
        await Model_kategori.Update(id,Data);
        req.flash('success','Berhasil update data');
        res.redirect('/kategori')
    }catch{
        req.flash('error','gagal menyimapan data');
        res.redirect('/kategori')
    }
})

// router.get('/delete/(:id)',function(req, res){
//     let id = req.params.id;
//     connection.query('delete from kategori where id_kategori =' + id, function(err){
//         if(err){
//             req.flash('error', 'gagal menghapus data');
//         }else{
//             req.flash('success', 'data terhapus');
//         }
//         res.redirect('/kategori');
//     })
// })

router.get('/delete/(:id)',async function(req,res,next){
    let id = req.params.id;
    await Model_kategori.Delete(id);
    req.flash('success','Berhasil menghapus data');
    res.redirect('/kategori')
})

module.exports = router;
