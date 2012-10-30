/**
 * http://stackoverflow.com/questions/1418050/string-strip-for-javascript
 */

if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

