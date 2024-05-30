<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Tasks;

class taskController extends Controller
{
    public function index(){
        $result = Tasks::all();

        if($result->isEmpty()){
            $data = [
                "success" => false,
                "error" => "No tasks found"
            ];
    
            return response()->json($data, 404);; 
        }

        $data = [
            "success" => true,
            "data" => $result
        ];

        return response()->json($data, 201);;
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'description' => 'sometimes',
            'user_id' => 'required',
            'state_id' => 'required',
        ]);

        if($validator->fails()){
            $data = [
                "success" => false,
                "error" => $validator->errors()
            ];
            return response()->json($data, 400);
        }
        $result = Tasks::create($request->all());
        if(!$result){
            $data = [
                "success" => false,
                "error" => "error creating task"
            ];
            return response()->json($data, 500);
        }
        $data = [
            "success" => true,
            "message" => "task store succesfully"
        ];
        return response()->json($data, 200);
    }

    public function show($id){
        $result = Tasks::find($id);

        if(!$result){
            $data = [
                "success" => false,
                "error" => "task not found"
            ];
    
            return response()->json($data, 404);; 
        }

        $data = [
            "success" => true,
            "task" => $result 
        ];
        return response()->json($data, 200);
    }

    public function update(Request $request, $id){
        $result = Tasks::find($id);
        if(!$result){
            $data = [
                "success" => false,
                "error" => "task not found, cannot update"
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'description' => 'sometimes',
            'user_id' => 'required',
            'state_id' => 'required',
        ]);

        if($validator->fails()){
            $data = [
                "success" => false,
                "error" => $validator->errors()
            ];
            return response()->json($data, 400);
        }

        $result->update($request->all());

        $data = [
            "success" => true,
            "message" => "task with id=$id updated successfully"
        ];
        return response()->json($data, 200);
    }

    public function updateParcial(Request $request, $id){
        $result = Tasks::find($id);
    
        if(!$result){
            $data = [
                "success" => false,
                "error" => "Tasks not found, cannot update"
            ];
            return response()->json($data, 404);
        }
    
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required',
            'description' => 'sometimes',
            'user_id' => 'sometimes|required',
            'state_id' => 'sometimes|required',
        ]);
    
        if($validator->fails()){
            $data = [
                "success" => false,
                "error" => $validator->errors()
            ];
            return response()->json($data, 400);
        }
    
        $validatedData = $validator->validated();

        $result->update($validatedData);
    
        $data = [
            "success" => true,
            "message" => "Tasks with id=$id updated successfully"
        ];
        return response()->json($data, 200);
    }

    public function destroy($id){
        $result = Tasks::find($id);
        if(!$result){
            $data = [
                "success" => false,
                "error" => "task not found, cannot destroy"
            ];
            return response()->json($data, 404);
        }
        $result->delete();

        $data = [
            "success" => true,
            "message" => "task with id=$id deleted successfully"
        ];
        return response()->json($data, 200);
    }
}
