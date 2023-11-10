import React from "react";
import { useNavigate } from "react-router-dom";
import { Component } from "react";
import Swal from 'sweetalert2'

import CategoriesService from "../../Services/CategoriesService";

export const withNavigation = (Component) => {
    return (props) => <Component {...props} navigate={useNavigate()} />;
};

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category_id: "",
            theme: "",
            user_id:'', 
            message: "",
            file: "",
            categories: [],
            errors: {},
            isLoading: false,
        };

        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleThemeChange = this.handleThemeChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
       
        CategoriesService.getAll().then((response) =>
            this.setState({ categories: response.data.data})
        );
        
    }

    handleCategoryChange(event) {
        this.setState({ category_id: event.target.value });
    }

    handleThemeChange(event) {
        this.setState({ theme: event.target.value });
    }

    handleMessageChange(event) {
        this.setState({ message: event.target.value });
    }

    handleFileChange(event) {
        this.setState({ file: event.target.files[0] });
    }

    handleSubmit(event) {
        event.preventDefault();

        

        if (this.state.isLoading) return;

        this.setState({
            errors: {},
            isLoading: true,
        });

        const userId = localStorage.getItem('user_id');

        let feedbackData = new FormData();
        feedbackData.append("theme", this.state.theme);
        feedbackData.append("message", this.state.message);
        feedbackData.append("category_id", this.state.category_id);
        feedbackData.append("file", this.state.file);
        feedbackData.append("user_id", userId);
       
      
        

        axios
            .post("/api/feedbacks", feedbackData)
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Заявка успешно отправлена'
                });
                this.props.navigate("/")})
            .catch((error) =>{
                this.setState({ errors: error.response.data.errors })
                Swal.fire({
                    icon: 'error',
                    title: 'Вы можете отправлять заявку только 1 раз в сутки'
                })
    })
            .finally(() => this.setState({ isLoading: false }));
    }

    

    errorMessage(field) {
        return (
            <div className="text-red-600 mt-1">
                {this.state.errors?.[field]?.map((index) => {
                    return <div key={index}>Это обязательное поле</div>;
                })}
            </div>
        );
    }

    render() {
        return (
            <>
                <h1 className="font-bold text-center text-2xl mb-5">
                    Создать заявку
                </h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Категория:
                        </label>
                        <select
                            value={this.state.category_id}
                            onChange={this.handleCategoryChange}
                            type="text"
                            className=" border-2  border-gray-300 rounded-md px-3 py-2 mt-1 mb-5 text-sm w-full hover:border-blue-500 focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Выбрать категорию</option>
                            {this.state.categories.map((category, index) => (
                                <option key={index} value={category.id}>
                                    {category.category}
                                </option>
                            ))}
                        </select>
                        {this.errorMessage("category_id")}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2 ">
                            Тема:
                        </label>
                        <input
                            value={this.state.theme}
                            onChange={this.handleThemeChange}
                            id="theme"
                            type="text"
                            placeholder="Тема"
                            className=" border-2 border-gray-300 rounded-md px-3 py-2 mt-1 mb-5 text-sm w-full hover:border-blue-500 focus:outline-none focus:border-blue-500"
                        />
                        {this.errorMessage("theme")}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Текст:
                        </label>
                        <textarea
                            value={this.state.message}
                            onChange={this.handleMessageChange}
                            placeholder="Текст..."
                            rows="4"
                            className="w-full border-gray-300 border-2 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm sm:leading-5 resize-none focus:outline-none focus:border-blue-500"
                        ></textarea>
                        {this.errorMessage("message")}
                    </div>

                    <div className="mb-6">
						<label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">Файл:</label>
						
                        <input
                            type="file"
                            id="file"
                            className="relative m-0 block w-full min-w-0 flex-auto rounded border-2 border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none "
                            onChange={this.handleFileChange}
                        />
                        {this.errorMessage("file")}
							
						
					</div>
                    <button
                        type="submit"
                        className="flex items-center px-3 py-2 bg-blue-600 text-white rounded"
                        disabled={this.state.isLoading}
                    >
                        <svg
                            role="status"
                            className={`w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 inline ${
                                !this.state.isLoading ? "hidden" : ""
                            }`}
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span>Отправить</span>
                    </button>
                </form>
            </>
        );
    }
}

export default withNavigation(Form);
