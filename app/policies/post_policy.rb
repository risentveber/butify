class PostPolicy < Struct.new(:user, :post)
  def update?
    is_owner? || is_admin?
  end

  def create?
    true
  end

  def show?
    true
  end

  def destroy?
    is_owner? || is_admin?
  end

  def edit?
    is_owner? || is_admin?
  end

  def change_categories?
    is_admin?
  end

  def like?
    true
  end

  def update_view_counter?
    true
  end

  def basket?
    true
  end

  private
    def is_owner?
      user.try(:id) == post.user_id
    end

    def is_admin?
      user.try(:admin?)
    end
end
