INSERT INTO
  employee_list (
    employee_id,
    first_name,
    middle_name,
    last_name,
    email,
    password,
    department_id,
    designation_id,
    evaluator_id,
    avatar,
    date_created
  )
VALUES
  (
    :employee_id,
    :first_name,
    :middle_name,
    :last_name,
    :email,
    :password,
    :department_id,
    :designation_id,
    :evaluator_id,
    :avatar,
    :date_created
  )