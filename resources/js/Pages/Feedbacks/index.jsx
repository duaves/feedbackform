import axios from "axios";
import React, { Component } from "react";

class FeedbacksIndex extends Component{

    constructor(props){
        super(props);

        this.state = {
            feedbacks:[]
        }
    }

    fetchFeedbacks(){
        axios.get('/api/feedbacks')
        .then(response => this.setState({feedbacks: response.data}))
    }

    componentDidMount(){
        this.fetchFeedbacks()
    }

    renderFeedbacks(){
        return this.state.feedbacks.map(feedback=> <tr  className=" hover:bg-gray-50">
                  
        <td className="px-4 py-4">
          <div className="font-medium text-gray-700">{feedback.id}</div>
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
            <div className="font-medium text-gray-700">{feedback.theme}</div>
          </div>
        </td>
        <td className="px-2 py-4"> {feedback.message}</td>
      
        <td className="px-2 py-4 ">
          <div className="text-sm font-normal text-gray-900">
            <div className="font-medium text-gray-700">{feedback.user_id}</div>
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
            <div className="font-medium text-gray-700">{feedback.created_at}</div>
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
        
      </tr>);
    }

    render(){
        return(
            <div>
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md m-5">
          <div className="min-w-screen ">
            <table className="min-w-max w-full table-auto border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-4 font-medium text-gray-900">
                    ID
                  </th>
                  <th scope="col" className="px-2 py-3 font-medium text-gray-900">
                    Категория
                  </th>
                  <th scope="col" className="px-2 py-4 font-medium text-gray-900">
                    Тема
                  </th>
                  <th scope="col" className="px-2 py-4 font-medium text-gray-900">
                    Сообщение
                  </th>
                 
                  <th scope="col" className="px-2 py-4 font-medium text-gray-900">
                    Имя
                  </th>
                  <th scope="col" className="px-2 py-4 font-medium text-gray-900">
                    E-mail
                  </th>
                  <th scope="col" className="px-2 py-4 font-medium text-gray-900">
                    Файл 
                  </th>
                  <th scope="col" className="px-2 py-4 font-medium text-gray-900">
                    Создано
                  </th>
                  <th scope="col" className="px-2 py-4 font-medium text-gray-900">
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
        <div className='flex justify-items-end'>
       
      </div>
      </div>
        );
    }
}

export default FeedbacksIndex

