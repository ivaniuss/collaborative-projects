<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\State;


class stateController extends Controller
{
    public function findAll(){
        return State::all();
    }

    public function save(){
        return "save";
    }

    public function findOne($id){
        return "find one $id";
    }

    public function update($id){
        return "update $id";
    }

    public function updateParcial($id){
        return "fupdate parcial $id";
    }

    public function destroy($id){
        return "destroy $id";
    }
}
