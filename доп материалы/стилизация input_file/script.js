document.addEventListener("DOMContentLoaded", () => {

	const forms = document.querySelectorAll("form");
	const inputFile = document.querySelectorAll(".upload-file__input");

	// кнопка Прикрепить файл
	inputFile.forEach( function(el) {
		let lextSelector = document.querySelector(".upload-file__text");
		let fileList;

		// Событие выбор файла(ов)
		el.addEventListener("change", function (e) {

			// создаем массив файлов
			fileList = [];
			for(let i =0; i < el.files.length; i++) {
				fileList.push(el.files[i]);
			}

			// вызов функции для каждого файла
			fileList.forEach(file => {
				uploadFile(file);
			});
		});


		// проверяем размер файлов и выводим название
		const uploadFile = (file) => {

			// файл < 5 Мб
			if(file.size > 5 * 1024 * 1024) {
				alert("Файл должен быть не более 5 Мб");
				return;
			}

			// Показ загружаемых файлов
			if(file && file.lenght > 1) {
				if( file.length <= 4) {
					textSelector.textContent = `Выбрано ${file.length} файлов`;
				}
			} else {
				textSelector.textContent = file.name;
			}
		}

	});

	// отправка формы на сервер
	const = posData = async (url, fData) => { // имеет асинхронные операции 

		// начало отправки
		// здесь можно оповестить пользователя о начале отправки

		// ждем ответ, только тогда наш код пойдет дальше
		let fetchResponse = await fetch(url, {
			method: "POST",
			body: fData
		});

		// ждем окончания операции
		return await fetchResponse.text();
	};


	if(forms) {
		forms.forEach( el => {
			el.addEventListener("submit", finction (e) {
				e.preventDefault();

				// создание объекьта FormData
				let fData = new FormData(this);

				// добавление файлов input type file
				let file = el.querySelector(".upload-file__input");
				for(let i = 0; i < (file.files.length); i++) {
					fData.append("files[]", file.files[i]); // добавляем в объект FormData()
				}

				//  отправка на сервер
				postData("./.php", fData)
					.then(fetchResponse => {
						console.log("Данные успешно отправлены!");
						console.lpg(fetchResponse);
					})
					.catch(function(error) {
						console.log("Ошибка!");
						console.log(error);
					});
			});
		});
	};
	
});