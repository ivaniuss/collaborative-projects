<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\State;


class stateController extends Controller
{
    public function index(){
        $result = State::all();

        if($result->isEmpty()){
            $data = [
                "success" => false,
                "error" => "No states found"
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
            'name' => 'required'
        ]);

        if($validator->fails()){
            $data = [
                "success" => false,
                "error" => $validator->errors()
            ];
            return response()->json($data, 400);
        }

        $result = State::create($request->all());
        if(!$result){
            $data = [
                "success" => false,
                "error" => "error creating state"
            ];
            return response()->json($data, 500);
        }
        $data = [
            "success" => true,
            "message" => "state store succesfully"
        ];
        return response()->json($data, 200);
    }

    public function show($id){
        $result = State::find($id);

        if(!$result){
            $data = [
                "success" => false,
                "error" => "state not found"
            ];
    
            return response()->json($data, 404);; 
        }

        $data = [
            "success" => true,
            "state" => $result 
        ];
        return response()->json($data, 200);
    }

    public function update(Request $request, $id){
        $result = State::find($id);
        if(!$result){
            $data = [
                "success" => false,
                "error" => "state not found, cannot update"
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required'
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
            "message" => "state with id=$id updated successfully"
        ];
        return response()->json($data, 200);
    }

    public function destroy($id){
        $result = State::find($id);
        if(!$result){
            $data = [
                "success" => false,
                "error" => "state not found, cannot destroy"
            ];
            return response()->json($data, 404);
        }
        $result->delete();

        $data = [
            "success" => true,
            "message" => "state with id=$id deleted successfully"
        ];
        return response()->json($data, 200);
    }
}
