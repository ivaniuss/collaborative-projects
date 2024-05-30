<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class userController extends Controller
{
    public function index(){
        $result = User::all();

        if($result->isEmpty()){
            $data = [
                "success" => false,
                "error" => "No users found"
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
            'username' => 'required',
            'email' => 'email',
            'password' => 'required'
        ]);

        if($validator->fails()){
            $data = [
                "success" => false,
                "error" => $validator->errors()
            ];
            return response()->json($data, 400);
        }

        $validatedData = $validator->validated();
        $validatedData['password'] = Hash::make($request->password);

        $result = User::create($validatedData);
        if(!$result){
            $data = [
                "success" => false,
                "error" => "error creating user"
            ];
            return response()->json($data, 500);
        }
        $data = [
            "success" => true,
            "message" => "user store succesfully"
        ];
        return response()->json($data, 200);
    }

    public function show($id){
        $result = User::find($id);

        if(!$result){
            $data = [
                "success" => false,
                "error" => "user not found"
            ];
    
            return response()->json($data, 404);; 
        }

        $data = [
            "success" => true,
            "user" => $result 
        ];
        return response()->json($data, 200);
    }

    public function update(Request $request, $id){
        $result = User::find($id);
        if(!$result){
            $data = [
                "success" => false,
                "error" => "user not found, cannot update"
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'email' => 'email',
            'password' => 'required'
        ]);

        if($validator->fails()){
            $data = [
                "success" => false,
                "error" => $validator->errors()
            ];
            return response()->json($data, 400);
        }
        $validatedData = $validator->validated();
        $validatedData['password'] = Hash::make($request->password);
        $result->update($validatedData);

        $data = [
            "success" => true,
            "message" => "user with id=$id updated successfully"
        ];
        return response()->json($data, 200);
    }

    public function updateParcial(Request $request, $id){
        $result = User::find($id);
    
        if(!$result){
            $data = [
                "success" => false,
                "error" => "User not found, cannot update"
            ];
            return response()->json($data, 404);
        }
    
        $validator = Validator::make($request->all(), [
            'username' => 'sometimes|required', 
            'email' => 'sometimes|email',  
            'password' => 'sometimes|required' 
        ]);
    
        if($validator->fails()){
            $data = [
                "success" => false,
                "error" => $validator->errors()
            ];
            return response()->json($data, 400);
        }
    
        $validatedData = $validator->validated();
        
        // Hash the password if provided
        if(isset($validatedData['password'])){
            $validatedData['password'] = Hash::make($validatedData['password']);
        }
        
        // Update the user with validated data
        $result->update($validatedData);
    
        $data = [
            "success" => true,
            "message" => "User with id=$id updated successfully"
        ];
        return response()->json($data, 200);
    }

    public function destroy($id){
        $result = User::find($id);
        if(!$result){
            $data = [
                "success" => false,
                "error" => "user not found, cannot destroy"
            ];
            return response()->json($data, 404);
        }
        $result->delete();

        $data = [
            "success" => true,
            "message" => "user with id=$id deleted successfully"
        ];
        return response()->json($data, 200);
    }
}
