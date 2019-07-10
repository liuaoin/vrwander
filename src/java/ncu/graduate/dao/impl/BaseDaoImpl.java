package ncu.graduate.dao.impl;

import ncu.graduate.dao.BaseDao;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.io.Serializable;
import java.util.List;

@Transactional
@Repository("baseDao")
public class BaseDaoImpl<T> implements BaseDao<T> {

    //DAO组件进行持久化操作底层依赖的SessionFactory组件
    @Resource
    private SessionFactory sessionFactory;

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    //根据ID加载实体
    @Override
    public T get(Class<T> entityClazz, Serializable id) {
        return (T)getSessionFactory().getCurrentSession().get(entityClazz,id);
    }

    //保存实体
    @Override
    public Serializable save(T entity) {
        return getSessionFactory().getCurrentSession().save(entity);
    }

    //更新实体
    @Override
    public void update(T entity) {
        getSessionFactory().getCurrentSession().saveOrUpdate(entity);
    }

    //删除实体
    @Override
    public void delete(T entity) {
        getSessionFactory().getCurrentSession().delete(entity);
    }

    //根据ID删除实体
    @Override
    public void deleteById(Class<T> entityClazz, Serializable id) {
        getSessionFactory().getCurrentSession().createQuery("delete " + entityClazz.getSimpleName()
            + " en where en.id = ?0").setParameter("0",id).executeUpdate();
    }

    //获取所有实体
    @Override
    public List<T> findAll(Class<T> entityClazz) {
        return find("select en from " + entityClazz.getSimpleName() + " en");
    }

    //获取实体总数
    @Override
    public long findCount(Class<T> entityClazz) {
        List<?> list = find("select count(*) from " + entityClazz.getSimpleName());
        if(list != null && list.size() == 1) {
            return (Long)list.get(0);
        }
        return 0;
    }

    //根据HQL语句查询实体
    public List<T> find(String hql) {
        return (List<T>)getSessionFactory().getCurrentSession().createQuery(hql).getResultList();
    }

    //根据带占位符的HQL语句查询实体
    public List<T> find(String hql,Object... params) {
        Query query = getSessionFactory().getCurrentSession().createQuery(hql);
        for(int i = 0, len = params.length; i < len; i++) {
            query.setParameter(i + "",params[i]);
        }
        return (List<T>)query.getResultList();
    }

    /**
     * 使用hql 语句进行分页查询操作
     * @param hql 需要查询的hql语句
     * @param pageNum 查询第pageNum页的记录
     * @param pageSize 每页需要显示的记录数
     * @return 当前页的所有记录
     */
    public List<T> findByPage(String hql, int pageNum, int pageSize) {
        return getSessionFactory().getCurrentSession().createQuery(hql)
                .setFirstResult((pageNum - 1) * pageSize).setMaxResults(pageSize).getResultList();
    }

    /**
     * 使用hql 语句进行分页查询操作
     * @param hql 需要查询的hql语句
     * @param params 如果hql带占位符参数，params用于传入占位符参数
     * @param pageNum 查询第pageNum页的记录
     * @param pageSize 每页需要显示的记录数
     * @return 当前页的所有记录
     */
    public List<T> findByPage(String hql, int pageNum, int pageSize, Object... params) {
        Query query = getSessionFactory().getCurrentSession().createQuery(hql);
        for(int i = 0, len = params.length; i < len; i++) {
            query.setParameter(i + "", params[i]);
        }
        return query.setFirstResult((pageNum - 1) * pageSize).setMaxResults(pageSize).getResultList();
    }

}
