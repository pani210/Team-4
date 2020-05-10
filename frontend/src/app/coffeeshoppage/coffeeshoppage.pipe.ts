import  { PipeTransform, Pipe} from '@angular/core';
import{Data} from '../coffeeData.model';

@Pipe({
    name:'coffeeDataFilter'
})

export class ShopFilterPipe implements PipeTransform{
    transform(issue:Data[],searchTerm:String):Data[]{
        if(!issue || !searchTerm){
            return issue;
        }
        return issue.filter(b=>b.name.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);
    }
} 