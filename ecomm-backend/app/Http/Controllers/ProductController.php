<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    function addProduct(Request $request){
        $product = new Product;
        $product->name = $request->input('name');
        $product->price = $request->input('price');
        $product->description = $request->input('description');
        $product->file_path = $request->file('file_path')->store('products');
        $product->save();
        return $product;
    }

    function productlist() {
        return Product::all();
    }

    function delete($id) {
        $result = Product::where('id', $id)->delete();
        if($result) {
            return ['result' => 'Product has been deleted'];
        }
        else {
            return ['error' => 'Product deleting failed'];
        }
    }

    function getProduct($id) {
        return Product::find($id);
    }

    function updateProduct(Request $request, $id) {
        $product = Product::find($id);
        $product->name = $request->input('name');
        $product->price = $request->input('price');
        $product->description = $request->input('description');
        if ($request->file('file_path')) {
            $product->file_path = $request->file('file_path')->store('products');
        }
        $product->save();
        return $product;
    }

    function searchProduct($key) {
        return Product::where('name', 'LIKE', "%$key%")->get();
    }
}
