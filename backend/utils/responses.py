from fastapi import HTTPException

def not_found_exception(item_name: str = "Item"):
    return HTTPException(status_code=404, detail=f"{item_name} not found")

def bad_request_exception(detail: str = "Bad Request"):
    return HTTPException(status_code=400, detail=detail)

def server_error_exception(detail: str = "Internal Server Error"):
    return HTTPException(status_code=500, detail=detail)
