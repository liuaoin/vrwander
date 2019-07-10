package ncu.graduate.dao;

import java.io.Serializable;
import java.util.List;

public interface BaseDao<T> {

    //根据ID加载实体
    public T get(Class<T> entityClazz, Serializable id);

    //保存实体
    public Serializable save(T entity);

    //更新实体
    public void update(T entity);

    //删除实体
    public void delete(T entity);

    //根据ID删除实体
    public void deleteById(Class<T> entityClazz, Serializable id);

    //获取所有实体
    public List<T> findAll(Class<T> entityClazz);

    //获取实体总数
    public long findCount(Class<T> entityClazz);

    public List<T> find(String hql);

    public List<T> find(String hql, Object... params);

    public List<T> findByPage(String hql, int pageNum, int pageSize);

    public List<T> findByPage(String hql, int pageNum, int pageSize, Object... params);
}
