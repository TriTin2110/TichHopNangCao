import express from 'express'
import { userController } from '../controllers/index.js'
import UserModel from '../models/User.js'

let userRoute = express()

userRoute.get('/', userController.getAll)
userRoute.post('/findByUsername', userController.getByUsername)
userRoute.post('/', userController.insert)
userRoute.post('/update', userController.update)
userRoute.post('/:name', userController.remove)

userRoute.get('/login-page', (req, res) => {
    res.render('login', { error: null })
})

userRoute.get('/view', async (req, res) => {
    try {
        const users = await UserModel.find()
        res.render('./ejs/user-view.ejs', { users, errorInput: null, error: null })
    } catch (err) {
        res.status(500).send(`Lỗi khi lấy danh sách người dùng: ${err.message}`)
    }
})

userRoute.put('/:id', async (req, res) => {
    try {
        const { fullName, phone, email, address, password } = req.body;

        const user = await UserModel.findByIdAndUpdate(
            req.params.id,
            { fullName, phone, email, address, password },
            { new: true } // trả về dữ liệu mới
        );

        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }

        res.json({ message: 'Cập nhật thành công', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

userRoute.delete('/:id', async (req, res) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }

        res.json({ message: 'Xoá thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
export { userRoute }