from fastapi import Depends, HTTPException, status
from app.models.user import User, UserRole

role_hierarchy = {
    UserRole.SUPER_ADMIN: [UserRole.SUPER_ADMIN, UserRole.STATE_ADMIN, UserRole.DISTRICT_OFFICER, UserRole.LAB_TECH, UserRole.FIELD_VET, UserRole.FARMER],
    UserRole.STATE_ADMIN: [UserRole.STATE_ADMIN, UserRole.DISTRICT_OFFICER, UserRole.LAB_TECH, UserRole.FIELD_VET, UserRole.FARMER],
    UserRole.DISTRICT_OFFICER: [UserRole.DISTRICT_OFFICER, UserRole.LAB_TECH, UserRole.FIELD_VET, UserRole.FARMER],
    UserRole.LAB_TECH: [UserRole.LAB_TECH],
    UserRole.FIELD_VET: [UserRole.FIELD_VET, UserRole.FARMER],
    UserRole.FARMER: [UserRole.FARMER],
}

def require_role(*roles: UserRole):
    def role_checker(current_user: User):
        if current_user.role not in roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")
        return current_user
    return role_checker

def apply_spatial_scope(query, model, user: User):
    if user.role in [UserRole.SUPER_ADMIN, UserRole.STATE_ADMIN]:
        return query
    if user.jurisdiction_code:
        return query.filter(model.jurisdiction_code.startswith(user.jurisdiction_code))
    return query
