'use client';
import {GenericCategoryPage} from '@clear-budget/shared/ui';

const AdminCategoryPage = () => (
  <GenericCategoryPage
    endpoint="http://localhost:5000/api/categories/admin"
    title="Admin Categories"
  />
);

export default AdminCategoryPage;
