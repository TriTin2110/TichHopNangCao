function update(_id, price, specialPrice, rating, image) {
        console.log(image)
        let button = document.getElementById('submit-button')
        let _idField = document.querySelector('#_id')
        let priceField = document.querySelector('#price')
        let specialPriceField = document.querySelector('#specialPrice')
        let ratingRecord = document.querySelector('#rating-record')
        let ratingField = document.querySelector('#rating')
        let imageName = document.querySelector('#image-name')
        let imageOld = document.querySelector('#old-image')

        let myForm = document.getElementById('my-form')
        
        myForm.action = '/product/update/' + _id
        ratingRecord.style.display = 'table-row'
        _idField.value = _id
        priceField.value = price
        specialPriceField.value = specialPrice
        ratingField.value = rating
        imageName.innerHTML = image
        imageOld.value = image
        
        button.value = 'Cập nhật'
        return false;
}

function cancel() {
        let button = document.getElementById('submit-button')
        let _idField = document.querySelector('#_id')
        let priceField = document.querySelector('#price')
        let specialPriceField = document.querySelector('#specialPrice')
        let myForm = document.getElementById('my-form')
        let ratingRecord = document.querySelector('#rating-record')
        let imageName = document.querySelector('#image-name')
        let imageOld = document.querySelector('#old-image')

        _idField.value = ''
        priceField.value = ''
        specialPriceField.value = ''
        ratingRecord.style.display = 'none'
        myForm.action = '/product'
        imageName.innerHTML = ''
        imageOld.value = ''

        button.value = 'Thêm sản phẩm mới'
        return false;
}

function activeFileInput() {
        let fileInput = document.getElementById('image')
        fileInput.click()
        return false
}