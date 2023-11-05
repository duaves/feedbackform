import axios from "axios";
import React, { Component } from "react";

class FeedbacksIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            feedbacks: [],
        };
    }

    fetchFeedbacks(page = 1) {
        axios
            .get("/api/feedbacks", { params: { page } })
            .then((response) =>
                this.setState({ feedbacks: response.data})
            );
    }

    componentDidMount() {
        this.fetchFeedbacks();
    }

    pageChanged(url) {
        const fullUrl = new URL(url);
        const page = fullUrl.searchParams.get('page')

        this.fetchFeedbacks(page)
        
    }

    renderPaginationLinks() {
        return this.state.feedbacks.meta.links.map((link, index) =>
            <button key={index} onClick={() => this.pageChanged(link.url)}
                    dangerouslySetInnerHTML={{__html: link.label}}
                    className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 first:rounded-l-md last:rounded-r-md"/>
        );
    }

    renderPagination() {
        return (
            <nav
                role="navigation"
                aria-label="Pagination Navigation"
                className="flex items-center justify-between"
            >
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700 leading-5">
                            c
                            <span>
                                <span className="font-medium">
                                    {" "}
                                    {this.state.feedbacks.meta.from}{" "}
                                </span>
                                по
                                <span className="font-medium">
                                    {" "}
                                    {this.state.feedbacks.meta.to}{" "}
                                </span>
                            </span>
                            из
                            <span className="font-medium">
                                {" "}
                                {this.state.feedbacks.meta.total}{" "}
                            </span>
                            заявок
                        </p>
                    </div>

                    <div>
                        <span className="relative z-0 inline-flex shadow-sm rounded-md">
                            {this.renderPaginationLinks()}
                        </span>
                    </div>
                </div>
            </nav>
        );
    }

    renderFeedbacks() {
        return this.state.feedbacks.data.map((feedback) => (
            <tr key={feedback.id} className=" hover:bg-gray-50">
                <td className="px-4 py-4">
                    <div className="font-medium text-gray-700">
                        {feedback.id}
                    </div>
                </td>

                <td className="px-2 py-4">
                    <div className="flex ">
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                            {feedback.category_id}
                        </span>
                    </div>
                </td>
                <td className="px-2 py-4">
                    <div className="text-sm font-normal text-gray-900">
                        <div className="font-medium text-gray-700">
                            {feedback.theme}
                        </div>
                    </div>
                </td>
                <td className="px-2 py-4"> {feedback.message}</td>

                <td className="px-2 py-4 ">
                    <div className="text-sm font-normal text-gray-900">
                        <div className="font-medium text-gray-700">
                            {feedback.user_id}
                        </div>
                    </div>
                </td>
                <td className="  px-2 py-4 ">
                    <div className="text-sm font-normal text-gray-900">
                        <div className="font-medium text-gray-700">
                            {feedback.user_id}
                        </div>
                    </div>
                </td>
                <td className=" px-2 py-4">
                    <div className="flex">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                            />
                        </svg>
                        {feedback.file}
                    </div>
                </td>
                <td className="  px-2 py-4 ">
                    <div className="text-sm font-normal text-gray-900">
                        <div className="font-medium text-gray-700">
                            {feedback.created_at}
                        </div>
                    </div>
                </td>

                <td className=" px-2 py-4">
                    <div className="flex flex-col space-y-1">
                        <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                            0
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                            0
                        </span>
                    </div>
                </td>
            </tr>
        ));
    }

    render() {
        if (!('data' in this.state.feedbacks)) return;
        return (
            <div>
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md m-5">
                    <div className="min-w-screen ">
                        <table className="min-w-max w-full table-auto border-collapse bg-white text-left text-sm text-gray-500">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-4 py-4 font-medium text-gray-900"
                                    >
                                        ID
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-3 font-medium text-gray-900"
                                    >
                                        Категория
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-4 font-medium text-gray-900"
                                    >
                                        Тема
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-4 font-medium text-gray-900"
                                    >
                                        Сообщение
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-2 py-4 font-medium text-gray-900"
                                    >
                                        Имя
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-4 font-medium text-gray-900"
                                    >
                                        E-mail
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-4 font-medium text-gray-900"
                                    >
                                        Файл
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-4 font-medium text-gray-900"
                                    >
                                        Создано
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-4 font-medium text-gray-900"
                                    >
                                        Статус
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                {this.renderFeedbacks()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>{this.renderPagination()}</div>
            </div>
            
        );
    }
}

export default FeedbacksIndex;
